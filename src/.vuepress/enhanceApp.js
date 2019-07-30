import Vuetify, {
  VApp,
  VNavigationDrawer,
  VToolbar,
  VToolbarItems,
  VBtn,
  VSpacer,
  VContent,
  VContainer,
  VLayout,
  VFlex,
  VCard,
  VTextField,
  VForm,
  VImg,
  VDivider,
  VIcon,
} from 'vuetify/lib';

export default ({ Vue }) => {
  Vue.use(Vuetify, {
    components: {
      VApp,
      VNavigationDrawer,
      VToolbar,
      VToolbarItems,
      VBtn,
      VSpacer,
      VContent,
      VContainer,
      VLayout,
      VFlex,
      VCard,
      VTextField,
      VForm,
      VImg,
      VDivider,
      VIcon,
    },
    theme: {
      primary: "#1263CC"
    }
  });
};
