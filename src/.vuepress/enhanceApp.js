import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCheckbox,
  VChip,
  VContainer,
  VContent,
  VDivider,
  VExpansionPanel,
  VExpansionPanelContent,
  VFlex,
  VForm,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListTile,
  VListTileTitle,
  VMenu,
  VNavigationDrawer,
  VSpacer,
  VTextField,
  VToolbar,
  VToolbarItems,
  VTooltip,
} from "vuetify/lib";

import redirect_dict from "./redirect.js";

export default ({ Vue, router, options }) => {
  Vue.use(Vuetify, {
    components: {
      VApp,
      VNavigationDrawer,
      VToolbar,
      VToolbarItems,
      VTooltip,
      VBtn,
      VSpacer,
      VContent,
      VContainer,
      VCheckbox,
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
      VListTileTitle,
      VMenu,
      VExpansionPanel,
      VExpansionPanelContent,
      VCardText,
      VChip,
    },
    theme: {
      primary: "#1263CC",
    },
  });

  router.beforeRouteEnter((to, from, next) => {
    const redirect = redirect_dict[to.fullPath];
    console.log(to.fullPath);
    console.log(redirect);
    if (redirect) {
      next({ path: redirect });
    } else next();
  });
};
