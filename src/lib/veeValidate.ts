import { defineRule, configure } from 'vee-validate';
import { required, email, confirmed } from '@vee-validate/rules';
import es from '@vee-validate/i18n/dist/locale/es.json';
import { localize, setLocale } from '@vee-validate/i18n';



configure({
  generateMessage: localize({
    es,
  }),
});
setLocale('es');

defineRule('required', required);
defineRule('email', email);
defineRule('confirmed', confirmed);