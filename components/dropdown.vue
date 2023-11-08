<template>
  <div class="select-wrapper" @click.stop="toggleSelect">
    <label>{{ option.display_name }}</label>
    <div class="select-display">
      {{ selectedLabel }}
      <fa icon="chevron-down" :class="{ 'open': isOpen }" />
    </div>
    <!-- Utilisez la balise <transition> pour englober la liste déroulante -->
    <transition name="dropdown">
      <ul v-if="isOpen" class="options-list">
        <li v-for="item in optionsList" :key="item.id" @click.stop="selectItem(item)">
          {{ item.language.fr }}
        </li>
      </ul>
    </transition>
  </div>
</template>


<script setup lang='ts'>
// import { OptionItem, SelectedValue } from '../types/global/option';
// import { OptionItem } from '../types/global/option';
import * as OptionTypes from '../types/global/option';
const props = defineProps({
  option: {
    type: Object as () => { value: string , display_name: string },
    required: true,
  },
});

const config = useRuntimeConfig();
console.log('API Base URL:', config.public.apiBaseUrl);


const emit = defineEmits(['update:selected']);

const optionsList = ref<OptionTypes.OptionItem[]>([]);
const selectedValue = ref(null);
const selectedLabel = ref('Choisir une option'); // Texte par défaut
const isOpen = ref(false);
const dropdownId = `dropdown-${props.option}-${Date.now()}`;

const apiUrl = `http://${config.public.backBaseUrl}:${config.public.backPort}/global/information-table/`;

const fetchData = async (option: OptionTypes.SelectedValue) => {
  try {
    const response = await fetch(`${apiUrl}${option}`);
    const data = await response.json();
    optionsList.value = [{ value: null, language: { fr: 'Choisir une option' } }, ...(data[props.option.value] || [])];
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

watch(() => props.option, (newOption) => {
  fetchData(newOption);
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // Envoyer l'ID unique du dropdown ouvert aux autres dropdowns
    document.dispatchEvent(new CustomEvent('dropdownOpened', { detail: dropdownId }));
  }
};

const handleDropdownOpened = (event) => {
  if (event.detail !== dropdownId) {
    isOpen.value = false;
  }
};

const selectItem = (item) => {
  selectedValue.value = item.value;
  selectedLabel.value = item.language.fr;
  isOpen.value = false;
  console.log('item.value', item.label);

  emit('update:selected', item);
};

// Optionnel: fermer le menu déroulant si l'utilisateur clique en dehors
const closeSelect = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.select-wrapper')) {
    isOpen.value = false;
  }
};


onMounted(() => {
  fetchData(props.option.value);
  document.addEventListener('dropdownOpened', handleDropdownOpened);
  window.addEventListener('click', closeSelect);
});

onUnmounted(() => {
  window.removeEventListener('click', closeSelect);
  document.removeEventListener('dropdownOpened', handleDropdownOpened);
});
</script>


<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  font-family: sans-serif; // Choisissez la police que vous préférez


  label {
  font-size: $font-family-dosis;
  color: $secondary-color;
  margin-bottom: $spacing-xs;
}


  .select-display {
    padding: 0.5em 1em;
    border: 1px solid $dark-gray-color; // Une bordure subtile
    border-radius: 0.25em; // Bordures légèrement arrondies
    background-color: $secondary-color;
    color: $white-color; // Fond blanc
    cursor: pointer; // Indique que c'est cliquable
    display: flex;
    justify-content: space-between; // Icône à droite
    align-items: center;
  }

  .fa-icon {
    transition: transform 0.3s ease; // Ajoute une transition douce
  }

  .options-list {
    position: absolute;
    width: 100%; // Largeur égale à celle du .select-display
    border: 1px solid #ccc;
    border-top: none; // Enlève la bordure du haut pour qu'elle s'aligne avec le .select-display
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Une ombre douce pour le démarquer du reste
    background-color: #fff;
    z-index: 10; // S'assure que la liste est au-dessus des autres éléments
    border-radius: 0 0 0.25em 0.25em; // Arrondit les coins inférieurs
    max-height: 200px; // Limite la hauteur de la liste déroulante
    overflow-y: auto; // Permet le défilement si la liste est trop longue
    margin-top: -1px; // Ajuste l'alignement avec le .select-display
    padding: 0;
    list-style-type: none;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 12px; // Largeur de la barre de défilement
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1; // Couleur de fond de la piste de défilement
      border-radius: 6px; // Arrondir les coins de la piste de défilement
    }

    &::-webkit-scrollbar-thumb {
      background: lighten($secondary-color, 5%);
      ; // Couleur de la partie défilable (le pouce)
      border-radius: 6px; // Arrondir les coins du pouce

      &:hover {
        background: darken($secondary-color, 5%);
        ; // Couleur du pouce lors du survol
      }
    }

    li {
      padding: 0.5em 1em;
      cursor: pointer;

      &:hover,
      &:focus {
        background-color: $main-color;
        color: $white-color;
        font-weight: $font-weight-semibold;
        padding-left: 25px;
      }
    }
  }
}

.icon.open {
  transform: rotate(180deg);
}

/* Ajoutez les règles de transition pour la classe .dropdown-enter-active et .dropdown-leave-active */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.05s, transform 0.05s;
  opacity: 0;
  transform: translateY(-20px);
}

.dropdown-enter,
.dropdown-leave-to

/* .dropdown-leave-active dans les versions <2.1.8 */
  {
  opacity: 0;
  transform: translateY(-20px);
}

/* État final pour l'entrée */
.dropdown-enter-to

/* .dropdown-enter-active dans les versions <2.1.8 */
  {
  opacity: 1;
  transform: translateY(0);
}

/* État initial pour la sortie */
.dropdown-leave {
  opacity: 1;
  transform: translateY(0);
}</style>
