<template lang="pug">

  div.bg-pl-not-black(id="footer")
    footer.fill-height.white--text
      v-container.py-5
        v-layout(row wrap)
          v-flex(xs12 sm4)
            v-layout(column)
              div(pb-5)
                v-form(
                  ref="form"
                  action="https://mailchimp.us3.list-manage.com/subscribe/post"
                  method="POST"
                )
                  v-text-field(
                    class="pb-3"
                    dark
                    outline
                    hide-details
                    label="Enter email for news and updates"
                    :rules="[rules.required, rules.email]"
                    v-model="email"
                    name="MERGE0"
                    id="MERGE0"
                  )
                  input(type="hidden" name="u" value="ed9736f18028b208205770080")
                  input(type="hidden" name="id" value="56698f0460")
                  v-layout(justify-center)
                    v-btn(
                      type="submit"
                      :disabled="isInvalidMail"
                      block
                      dark
                      round
                      color="#1263CC"
                    ) Subscribe

              v-layout.py-4.hidden-xs-only(row justify-center align-center)
                div.px-3(v-for="(icon, index) in socialIcons" :key="index")
                  a(
                    :aria-label="icon.name.charAt(0).toUpperCase() + icon.name.slice(1)"
                    :href="icon.href"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  )
                    v-img(
                      :src="$withBase(`/icons/${icon.name}.svg`)"
                      width="32px"
                    )
              v-layout.hidden-xs-only(justify-center)
                span.caption--1 Copyright © {{ currentYear() }} Pupil Labs GmbH All rights reserved.

          //- internal links
          v-spacer.hidden-xs-only
          v-flex(xs12 sm4)
            v-layout(row wrap).fill-height
              v-flex(xs6)
                v-layout(column).fill-height
                  span.pb-3 Products
                  v-flex(
                    v-for="(link,i) in productLinks"
                    :key="i"
                  )
                    a.pl-light-grey(
                      :class="{'text-capitalize': link.title !== 'vr/ar', 'text-uppercase': link.title == 'vr/ar'}"
                      :href="`https://pupil-labs.com${link.href}`"
                      target="__blank"
                    ) {{ link.title }}
              v-flex(xs6)
                v-layout(column).fill-height
                  span.pb-3 Company
                  v-flex(
                    v-for="(link,i) in companyLinks"
                    :key="i"
                  )
                    a.text-capitalize.pl-light-grey(
                      :href="`https://pupil-labs.com${link.href}`"
                      target="__blank"
                    ) {{ link.title }}

</template>

<script>
export default {
  data() {
    return {
      productLinks: [
        { title: "all products", href: "/products" },
        { title: "pupil invisible", href: "/products/invisible/" },
        { title: "pupil core", href: "/products/core/" },
        { title: "vr/ar", href: "/products/vr-ar" },
        { title: "pupil cloud", href: "/products/cloud" },
        { title: "support", href: "/products/support" }
      ],
      companyLinks: [
        { title: "about", href: "/about/" },
        { title: "news", href: "/news/" },
        { title: "careers", href: "/careers/" },
        { title: "imprint", href: "/imprint/" },
        { title: "legal", href: "/legal/" },
        { title: "privacy policy", href: "/legal/privacy/" }
      ],
      socialIcons: [
        { name: "github", href: "https://github.com/pupil-labs" },
        { name: "discord", href: "https://pupil-labs.com/chat" },
        { name: "twitter", href: "https://twitter.com/pupil_labs" },
        {
          name: "youtube",
          href: "https://www.youtube.com/c/PupilLabs"
        }
      ],
      email: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },

  computed: {
    isInvalidMail() {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid = pattern.test(this.email);
      return !isValid;
    }
  },

  methods: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>
