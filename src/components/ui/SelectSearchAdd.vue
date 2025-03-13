<template>
  <div class="w-full max-w-md relative">
    <!-- Label für das Eingabefeld (optional) -->
    <label v-if="label" class="label label-text" :for="id">{{ label }}</label>
    <div class="relative">
      <!-- Eingabefeld für die Suche -->
      <input
        ref="inputRef"
        :id="id"
        type="text"
        v-model="searchTerm"
        @input="debouncedInput"
        @focus="handleFocus"
        @keydown="handleKeydown"
        :placeholder="placeholder"
        class="input input-bordered w-full cursor-pointer"
        @click="handleInputClick"
      />
      <!-- Pfeil-Icon zum Öffnen/Schließen der Dropdown -->
      <span class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="handleMouseClick">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <!-- Dropdown-Liste (wird nur angezeigt, wenn isOpen true ist) -->
    <div v-if="isOpen" class="absolute w-full bg-base-100 shadow-lg max-h-60 overflow-y-auto mt-1 z-50">
      <ul>
        <!-- Iteration über die gefilterten/totalen Elemente -->
        <li 
          v-for="(item, index) in totalItems" 
          :key="item.id" 
          :class="{'bg-base-200': index === highlightedIndex}" 
          class="cursor-pointer p-2 hover:bg-base-200"
          @click="handleItemClick(item)"
        >
          <!-- Anzeige des Labels für die "Neu erstellen"-Option -->
          <span v-if="item.id === 'new'" class="font-semibold text-accent">
            {{ newItemLabel }}
          </span>
          <!-- Anzeige des Item Namens -->
          <span v-else>
            {{ item[nameKey] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * @description Vue.js Komponente für ein Suchfeld mit Dropdown-Auswahl und optionaler "Neu erstellen" Funktion.
 * Der Nutzer kann aus einer Liste von Elementen wählen, diese durchsuchen oder neue Elemente erstellen.
 *
 * @props {Array} items - Array von Objekten, die in der Dropdown-Liste angezeigt werden sollen.
 *                        Jedes Objekt muss die Eigenschaften 'id' und 'nameKey' haben.
 * @props {String|Number} modelValue - Der aktuell ausgewählte Wert (ID des ausgewählten Elements). Ermöglicht v-model Binding.
 * @props {String} id - Eindeutige ID für das Eingabefeld (optional).
 * @props {String} placeholder - Placeholder-Text für das Eingabefeld (optional).
 * @props {String} label - Beschriftung für die Komponente (optional).
 * @props {String} nameKey - Der Schlüssel im 'items'-Array, der den anzuzeigenden Namen enthält (optional, default: 'name').
 * @props {Number} debounceDelay - Verzögerung (in ms) für die Suchfunktion, um Performance zu verbessern (optional, default: 200).
 * @props {Boolean} allowCreate - Boolean, der bestimmt, ob das Erstellen neuer Einträge erlaubt ist (optional, default: true).
 * @props {String} newItemPrefix - Prefix für das Label eines neu zu erstellenden Items (optional).
 * @props {String} newItemSuffix - Suffix für das Label eines neu zu erstellenden Items (optional).
 *
 * @emits {String} update:modelValue - Wird ausgelöst, wenn ein Item ausgewählt wird und übergibt die 'id' des ausgewählten Items.
 * @emits {Object} select - Wird ausgelöst, wenn ein Item ausgewählt wird und übergibt das gesamte Item-Objekt.
 * @emits {String} create - Wird ausgelöst, wenn ein neues Item erstellt wird und übergibt den Suchbegriff.
 * @emits {String} confirm - Wird ausgelöst, wenn Enter gedrückt wird, aber kein Eintrag markiert ist.
 * @emits {String} notify - Gibt eine Benachrichtigung aus (z.B. wenn kein passender Eintrag gefunden wurde).
 *
 * @example
 *  <SelectSearchAdd
 *    :items="[{ id: 1, name: 'Apfel' }, { id: 2, name: 'Banane' }]"
 *    v-model="selectedValue"
 *    label="Frucht auswählen:"
 *    @create="createNewItem"
 *  />
 */
import { ref, computed, onMounted, nextTick, watch } from 'vue';
export default {
  name: "SelectSearchAdd",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    id: {
      type: String,
      default: 'select-search-add'
    },
    placeholder: {
      type: String,
      default: 'Bitte auswählen...'
    },
    label: {
      type: String,
      default: ''
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    debounceDelay: {
      type: Number,
      default: 200
    },
    allowCreate: {
      type: Boolean,
      default: true
    },
    newItemPrefix: {
      type: String,
      default: '"'
    },
    newItemSuffix: {
      type: String,
      default: '" neu anlegen'
    }
  },
  emits: ['update:modelValue', 'select', 'create', 'confirm', 'notify'],
  setup(props, { emit, expose }) {
    // Suchbegriff des Benutzers
    const searchTerm = ref('');
    // Steuert das Öffnen/Schließen der Dropdown-Liste
    const isOpen = ref(false);
    // Index des aktuell hervorgehobenen Elements in der Dropdown-Liste
    const highlightedIndex = ref(-1);
    // Referenz auf das Eingabefeld
    const inputRef = ref(null);
    // Steuert, ob die Filterung aktiv ist (nach Debounce)
    const filterActive = ref(false);
    // Timeout für die Debounce-Funktion
    let debounceTimeout = null;
    
    // Watcher: Aktualisiere den Inputtext, wenn die Liste der Items sich ändert 
    watch(() => props.items, (newItems) => {
      if (props.modelValue) {
        const selected = newItems.find(item => item.id === props.modelValue);
        if (selected) {
          searchTerm.value = selected[props.nameKey];
        } else {
          emit('notify', 'Kein passender Eintrag gefunden.');
        }
      }
    }, { immediate: true });

    // Neuer Watcher: Aktualisiere den Inputtext, wenn sich der modelValue ändert
    watch(() => props.modelValue, (newVal) => {
      if (newVal) {
        const selected = props.items.find(item => item.id === newVal);
        if (selected) {
          searchTerm.value = selected[props.nameKey];
        }
      } else {
        searchTerm.value = '';
      }
    }, { immediate: true });
    
    // Berechnete Eigenschaft: Gefilterte Liste der Items basierend auf dem Suchbegriff
    const filteredItems = computed(() => {
      if (!filterActive.value) return props.items;
      return props.items.filter(item =>
        item[props.nameKey].toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
    
    // Berechnete Eigenschaft: Prüft, ob ein neuer Eintrag erstellt werden kann
    const canCreateNew = computed(() => {
      if (!props.allowCreate || !searchTerm.value) return false;
      return !props.items.some(item => item[props.nameKey].toLowerCase() === searchTerm.value.toLowerCase());
    });
    
    // Berechnete Eigenschaft: Kombinierte Liste aus gefilterten Items und der "Neu erstellen"-Option (falls erlaubt)
    const totalItems = computed(() => {
      if (canCreateNew.value) {
        return [...filteredItems.value, { id: 'new', [props.nameKey]: searchTerm.value }];
      }
      return filteredItems.value;
    });
    
    // Berechnete Eigenschaft: Label für die "Neu erstellen"-Option
    const newItemLabel = computed(() => {
      return `${props.newItemPrefix}${searchTerm.value}${props.newItemSuffix}`;
    });
    
    // Funktion zum Öffnen der Dropdown-Liste
    const openDropdown = () => {
      isOpen.value = true;
      highlightedIndex.value = totalItems.value.length ? 0 : -1;
    };
    
    // Funktion zum Schließen der Dropdown-Liste
    const closeDropdown = () => {
      isOpen.value = false;
      highlightedIndex.value = -1;
    };
    
    // Debounced-Funktion für die Suche
    const debouncedInput = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        filterActive.value = true;
        if (!isOpen.value) {
          openDropdown();
        }
      }, props.debounceDelay);
    };
    
    // Funktion, die beim Fokussieren des Eingabefelds ausgeführt wird
    const handleFocus = () => {
      filterActive.value = false;
      nextTick(() => {
        inputRef.value.select();
      });
    };

    // Funktion für den Klick in den Input-Bereich
    const handleInputClick = () => {
      isOpen.value ? closeDropdown() : openDropdown();
    };
    
    // Funktion für den Klick auf das Icon
    const handleMouseClick = () => {
      isOpen.value ? closeDropdown() : openDropdown();
    };
    
    // Funktion für die Tasten-Navigation im Inputfeld
    const handleKeydown = (event) => {
      if (event.key === 'ArrowDown') {
        // Pfeiltaste runter: Öffnet Dropdown oder bewegt den Highlight-Index
        if (!isOpen.value) {
          filterActive.value = false;
          openDropdown();
        } else if (highlightedIndex.value < totalItems.value.length - 1) {
          highlightedIndex.value++;
        }
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        // Pfeiltaste hoch: Bewegt den Highlight-Index nach oben
        if (isOpen.value && highlightedIndex.value > 0) {
          highlightedIndex.value--;
        }
        event.preventDefault();
      } else if (event.key === 'Enter') {
        // Enter-Taste: Wählt das markierte Element aus oder bestätigt die Eingabe
        if (isOpen.value && highlightedIndex.value >= 0 && totalItems.value.length) {
          const selected = totalItems.value[highlightedIndex.value];
          if (selected.id === 'new') {
            emit('create', searchTerm.value);
          } else {
            selectItem(selected);
          }
          closeDropdown();
        } else {
          emit('confirm');
        }
        event.preventDefault();
      } else if (event.key === 'Escape') {
        // Escape-Taste: Schließt das Dropdown
        closeDropdown();
        event.preventDefault();
      }
    };
    
    // Funktion für den Klick auf ein Element in der Dropdown-Liste
    const handleItemClick = (item) => {
      if (item.id === 'new') {
        emit('create', searchTerm.value);
      } else {
        selectItem(item);
      }
      closeDropdown();
    };
    
    // Funktion zum Auswählen eines Elements
    const selectItem = (item) => {
      // Aktualisiere das Eingabefeld mit dem Namen des ausgewählten Items
      searchTerm.value = item[props.nameKey];
      // Übergebe die Auswahl via v-model an die Elternkomponente
      emit('update:modelValue', item.id);
      // Sende zusätzlich das gesamte Item als Event
      emit('select', item);
    };
    
    // Über expose wird eine Methode zum Fokussieren des Inputfelds nach außen verfügbar gemacht
    expose({
      focusInput() {
        inputRef.value.focus();
        inputRef.value.select();
      }
    });
    
    return {
      searchTerm,
      isOpen,
      filteredItems,
      totalItems,
      canCreateNew,
      newItemLabel,
      highlightedIndex,
      debouncedInput,
      handleFocus,
      handleMouseClick,
      handleInputClick,
      handleKeydown,
      handleItemClick,
      selectItem,
      inputRef
    };
  }
};
</script>
