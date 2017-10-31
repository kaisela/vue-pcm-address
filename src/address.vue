<template>
  <div class="address-mobile">
    <div class="address-tabs">
      <ul>
        <li v-for="(item, index) in tabs" v-if="item.show" @click="tabClick(item, index)"><a href="javascript:;" v-bind:class='{active:item.active}'>{{item.text}}</a></li>
      </ul>
    </div>
    <div class="address-panels">
      <div class="prov">
        <div class="block-index" v-for="item in panel">
          <div class="address-label" v-if="item.label">{{item.label}}</div>
          <div class="address-btns" v-for="btn in item.btns">
            <button v-bind:class="{active:btn.active}" @click="btnClick(btn)" >{{btn.name}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'address',
  props: {
    showLevel: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      tabs: [{text: '省份', show: true, active: true, dCode: 10, level: 1},
            {text: '城市', show: false, active: false, level: 2},
            {text: '区县', show: false, active: false, level: 3},
            {text: '乡镇', show: false, active: false, level: 4}],
      panel: [],
      curBtn: {
        code: 10
      },
      curBtnData: null,
      selectedBtns: {}
    }
  },
  methods: {
    btnClick(btn) {
      this.curBtn = btn;
      this.tabs[btn.level - 1].text = btn.name;
      this.selectedBtns[btn.level] = btn;
      if (btn.level === this.showLevel) {
        return;
      }
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].active = false;
      }
      for (let i = (btn.level + 1); i <= this.showLevel; i++) {
        delete this.selectedBtns[i];
        this.tabs[i - 1].show = false;
      }
      if (!btn.isZS) {
        this.tabs[btn.level].show = true;
        this.tabs[btn.level].active = true;
        this.tabs[btn.level].dCode = this.curBtn.code;
      } else {
        this.tabs[btn.level + 1].show = true;
        this.tabs[btn.level + 1].active = true;
        this.tabs[btn.level + 1].dCode = this.curBtn.code;
      }
      let btnData = require(`./assset/json/${btn.code}.json`);
      if (btnData.data) {
        this.curBtnData = btnData.data;
        this.panel = [{btns: btnData.data.childs}];
      } else {
        this.panel = [];
      }
    },
    btnChecked(level) {
      let curBtn = this.selectedBtns[level];
      if (!curBtn) return;
      _.forEach(this.panel, (item) => {
        _.forEach(item, (n, key) => {
          if (key === 'btns') {
            for (let i = 0; i < n.length; i++) {
              if (n[i].code === curBtn.code) {
                n[i].active = true;
              } else {
                n[i].active = false;
              }
            }
          }
        })
      })
      this.panel = _.merge([], this.panel);
    },
    tabClick(item, index) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (i === index) {
          this.tabs[i].active = true;
        } else {
          this.tabs[i].active = false;
        }
      }
      let btnData = require(`./assset/json/${item.dCode}.json`);
      if (btnData.data) {
        this.curBtnData = btnData.data;
        this.panel = [{btns: btnData.data.childs}];
      } else {
        this.panel = btnData;
      }
      this.btnChecked(item.level);
    }
  },
  created() {
    this.panel = require('./assset/json/10.json');
  }
}
</script>

<style lang="scss">
@import "address.scss";
</style>
