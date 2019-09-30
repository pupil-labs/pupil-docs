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
  VCardTitle,
  VTextField,
  VForm,
  VImg,
  VDivider,
  VIcon,
  VList,
  VListTile,
  VListTileTitle
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
      VCardTitle,
      VTextField,
      VForm,
      VImg,
      VDivider,
      VIcon,
      VList,
      VListTile,
      VListTileTitle
    },
    theme: {
      primary: "#1263CC"
    }
  });
};
