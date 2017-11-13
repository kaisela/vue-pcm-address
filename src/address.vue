<template>
  <div class="pcm-address" v-clickoutside="handleClose">
    <div :class="addressInputClass" >
      <input :class="inputClass" v-model="addressText" :title="addressText" :readonly="readonly" @click="showPanel"/>
      <i class="iconfont icon-less"></i>
    </div>
    <addressPanel
      v-show="show"
      :showLevel="showLevel"
      :termType="termType"
      @complate="complate"></addressPanel>
  </div>
  </template>

<script>
import Clickoutside from './model/clickoutside';
import AddressPanel from './address-panel.vue';
import {addClass, setStyle, getClient} from './model/dom'
export default {
  name: 'address',
  components: {
    AddressPanel: AddressPanel
  },
  props: {
    inputClass: {
      type: String,
      default: 'input'
    },
    readonly: {
      type: Boolean,
      default: true
    },
    showLevel: {
      type: Number,
      default: 4
    },
    termType: {
      type: String,
      default: 'mobile'
    },
    linkSymbol: {
      type: String,
      default: ''
    },
    addressInputClass: {
      type: String,
      default: 'address-input'
    }
  },
  directives: { Clickoutside },
  data() {
    return {
      show: false,
      addressText: '',
      shade: null
    }
  },
  methods: {
    handleClose() {
      this.show = false;
      if (this.termType === 'mobile') {
        setStyle(this.shade, 'display', `none`);
        setStyle(document.getElementById('appContent'), 'height', `auto`);
        setStyle(document.getElementById('appContent'), 'overflow', `auto`);
      }
    },
    showPanel() {
      this.show = true;
      if (this.termType === 'mobile') {
        setStyle(this.shade, 'width', `100%`);
        setStyle(this.shade, 'display', `block`);
        setStyle(document.getElementById('appContent'), 'height', `${getClient().height}px`);
        setStyle(document.getElementById('appContent'), 'overflow', `hidden`);
      }
    },
    complate(selectValue) {
      let text = [];
      let lastAddress = '';
      let backVal = {};
      for (let i = 0; i < selectValue.length; i++) {
        text.push(selectValue[i].name);
        if (selectValue[i].level === this.showLevel) {
          lastAddress = selectValue[i].code;
        }
      }
      this.addressText = text.join(this.linkSymbol);
      backVal.valueData = selectValue;
      backVal.text = text.join(this.linkSymbol);
      backVal.value = lastAddress;
      backVal.level = this.showLevel;
      this.$emit('complateBack', backVal)
      this.handleClose();
    },
    createShade() {
      if (this.termType === 'mobile') {
        this.shade = document.createElement('div');
        addClass(this.shade, 'address-shade');
        setStyle(this.shade, 'height', `${getClient().height}px`);
        this.shade.remove()
        document.body.appendChild(this.shade);
      }
    }
  },

  created() {
    this.createShade();
  }
}
</script>

<style lang="scss">
@import './assset/iconfont/iconfont.css';
@import "address.scss";
</style>

