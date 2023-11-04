// fichier: types/alert.d.ts
declare module '@/components/alert.vue' {
  import { DefineComponent } from 'vue';

  interface AlertMethods {
    addMessage: (type: 'success' | 'error', text?: string) => void;
  }

  const component: DefineComponent<{}, AlertMethods, any>;
  export default component;
}
