import Vuetify, {
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
} from "vuetify/lib";

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

  var redirect_dict = {
    "/#export": "/core/software/pupil-player/#export",
    "/#surface-tracking": "/core/software/pupil-capture/#surface-tracking",
    "/#analysis-plugins": "/core/software/pupil-player/#analysis-plugins",
    "/#pupil-capture": "/core/software/pupil-capture/",
    "/#pupil-player": "/core/software/pupil-player/",
    "/#network-plugins": "/core/software/pupil-capture/#network-plugins",
    "/#interprocess-and-network-communication": "/developer/core/network-api/",
    "/#annotations": "/core/software/pupil-capture/#annotations",
    "/invisible/user-guide/invisible-companion-app/#local-transfer":
      "/invisible/how-tos/data-collection-with-the-companion-app/transfer-recordings-via-usb",
    "/cloud/enrichments/#reference-image-mapper":
      "/invisible/enrichments/reference-image-mapper/",
    "/cloud/": "/invisible/",
  };

  router.beforeEach((to, from, next) => {
    if (Object.keys(redirect_dict).indexOf(to.fullPath) >= 0) {
      next({ path: redirect_dict[to.fullPath] });
    } else {
      next();
    }
  });
};
