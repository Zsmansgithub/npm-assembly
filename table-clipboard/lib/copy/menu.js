import Vue from 'Vue';
import Main from './main.vue';
let Builder = Vue.extend(Main);
export default {
    install (vue) {
        vue.prototype.$YOURNAME = this.getComponent;
    },
    getComponent (param) {
        let instance = new Builder({
            propsData: { param }
        });
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        return instance;
    }
};
