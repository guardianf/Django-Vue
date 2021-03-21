/**
 * @file    this is a components defination file for flexiv front-end webpage
 * @author  yubin.fu <yubin.fu@flexiv.com>
 */

/**
 * component container
 * @type { object }
 */
export const fvrContainer = {
  template: `<el-container class='fvr-container'><slot /></el-container>`,
  created() {}
}

/**
 * define font-size
 * @type { array }
 */
const FontSize = ['xl', 'l', 'm', 'b', 's', 'xs']

/**
 * define font component
 * @type { object }
 */
export const fvrFont = {
  template: `<span :class="['fvr-font-'+ size, 'fvr-font-color-' + type]"><slot /></span>`,
  props: {
    size: {
      type: String,
      default: 'b',
      validator(value) {
        return FontSize.indexOf(value.toLowerCase()) !== -1
      }
    },
    type: {
      default: 'default',
      validator(value) {
        return ['error', 'default'].indexOf(value.toLowerCase()) !== -1
      }
    }
  },
  created() {}
}

/**
 * component banner
 * @type { object }
 */
export const fvrBanner = {
  template: `<el-header class='fvr-banner'>
                  <el-row type='flex' style='width: 100%' align='middle'>
                          <i class='fvr-logo'></i>
                          <fvr-font size='xl' class='fvr-fullfill'>Management System</fvr-font>
                          <slot />
                  </el-row>
              </el-header>`,
  components: {
    'fvr-font': fvrFont,
  }
}

/**
 * define username input component
 * @type { object }
 */
export const fvrUserNameInput = {
  template: `
          <div class='fvr-input-outside' :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
              <el-row type='flex' align='middle' class='fvr-input-underline fvr-font-l'>
                  <i class='el-icon-user'></i>
                  <input class='fvr-input-inside fvr-font-color-default' v-bind:placeholder='placeholder' :name='newName' v-model='newValue' @keyup='submit' :required='required' @focus='focus' @blur='blur' ref='input' autocomplete='off' />
              </el-row>
              <el-row type='flex' justify='end'>
                  <fvr-font size='m' v-bind:type='fontType'>{{ error }}</fvr-font>
              </el-row>
          </div>
      `,
  props: ['name', 'placeholder', 'value', 'error', 'width', 'required'],
  components: {
    'fvr-font': fvrFont,
  },
  computed: {
    fontType() {
      return this.error !== '' ? 'error' : 'default'
    },
    newName() {
      return this.name;
    },
    newValue() {
      return this.value;
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  methods: {
    submit() {
      this.$emit('input', this.value)
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

/**
 * define password input component
 * @type { object }
 */
export const fvrPasswordInput = {
  template: `
          <div class='fvr-input-outside' :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
              <el-row type='flex' align='middle' class='fvr-input-underline fvr-font-l'>
                  <i class='el-icon-lock'></i>
                  <input class='fvr-input-inside fvr-font-color-default' :placeholder='newPlaceholder' :name='newName' :type='type' v-model='value' @change='submit' :required='required' @focus='focus' @blur='blur' ref='input' autocomplete='off' />
                  <i :class="['fa', type == 'password' ? 'fa-eye': 'fa-eye-slash' ]" @click='toggleInput'></i>
              </el-row>
              <el-row type='flex' justify='end'>
                  <fvr-font size='m' :type='fontType'>{{ error }}</fvr-font>
              </el-row>
          </div>
      `,
  props: ['name', 'placeholder', 'value', 'error', 'required'],
  components: {
    'fvr-font': fvrFont,
  },
  data() {
    return {
      type: this.name == 'password' ? 'password' : '',
      isFocus: false,
    }
  },
  computed: {
    fontType() {
      return this.error !== '' ? 'error' : 'default'
    },
    newPlaceholder() {
      return this.placeholder;
    },
    newName() {
      return this.name;
    }
  },
  methods: {
    toggleInput() {

      this.type = this.type === 'password' ? '' : 'password'
    },
    submit() {
      this.$emit('input', this.value)
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

/**
 * define captcha input component
 * @type { object }
 */
export const fvrCaptcha = {
  template: `
      <div class='fvr-input-outside' :class="['fvr-input-' + type, isFocus? 'fvr-input-focus' : '']">
              <el-row type='flex' align='middle' class='fvr-font-l'>
                  <el-col :span='15'>
                      <el-row type='flex' justify='start' align='middle' class='fvr-input-underline'>
                          <input class='fvr-input-inside fvr-font-color-default' :placeholder='placeholder' :name='name' v-model='value' @change='submit' :required='required' @focus='focus' @blur='blur' ref='input' />
                      </el-row>
                  </el-col>
                  <el-col :span='8' :offset='1'>
                      <el-row type='flex' justify='end' align='middle'>
                          <img :src="src" @click='refresh' />
                      </el-row>
                  </el-col>
              </el-row>
              <el-row type='flex' justify='end'>
                  <fvr-font size='m' :type='type'>{{ error }}</fvr-font>
              </el-row>
          </div>
      `,
  props: ['value', 'placeholder', 'error', 'name', 'required'],
  components: {
    'fvr-font': fvrFont,
  },
  data() {
    return {
      src: '/api/v1/captcha/',
      isFocus: false,
    }
  },
  computed: {
    type() {
      return this.error !== '' ? 'error' : 'default'
    },
  },
  methods: {
    submit() {
      this.$emit('input', this.value)
    },
    refresh() {
      this.src = "/api/v1/captcha/?t=" + Math.random()
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

/**
 * define checkbox component
 * @type { object }
 */
export const fvrCheckbox = {
  template: `
          <div class="fvr-checkbox">
              <el-checkbox v-model="value" true-label='yes' false-label='no' @change='submit'>{{ label }}</el-checkbox>
          </div>
      `,
  props: ['label', 'value'],
  methods: {
    submit() {
      this.$emit("input", this.value)
    }
  }
}

/**
 * define row component
 * @type { object }
 */
export const fvrRow = {
  template: `
          <el-row type='flex' class='fvr-row' :justify='newJustify' :align='newAlign'>
              <slot />
          </el-row>
      `,
  props: ['justify', 'align'],
  computed: {
    newJustify() {
      return this.justify;
    },
    newAlign() {
      return this.align;
    },
  },
}

/**
 * define avatar component
 */
export const fvrAvatar = {
  template: `
          <el-avatar :src='newSrc'></el-avatar>
      `,
  props: ['src'],
  computed: {
    newSrc() {
      return this.src;
    },
  },
}

/**
 * define dropdown item component
 */
export const fvrDropdownItem = {
  template: `<el-dropdown-item :index="newIndex" :command="newCommand"><slot /></el-dropdown-item>`,
  props: ['command', 'index', ],
  computed: {
    newCommand() {
      return this.command;
    },
    newIndex() {
      return this.index
    },
  },
}

/**
 * define dropdown menu component
 */
export const fvrDropdownMenu = {
  template: `<el-dropdown-menu :slotblock="newSlot" class="fvr-dropdown-menu"><slot /></el-dropdown-menu>`,
  props: ["slotblock"],
  computed: {
    newSlot() {
      return this.slot;
    }
  },
}

/**
 * define dropdown component
 */
export const fvrDropdown = {
  template: `
      <el-dropdown @command="handleCommand" :class="['fvr-dropdown', isHover ? 'fvr-dropdown-hover' : '']" @visible-change='hover'>
          <span class="el-dropdown-link"><i class="el-icon--right el-icon-arrow-down"></i></span>
          <fvr-dropdown-menu slotblock="dropdown">
              <fvr-dropdown-item v-for="list in lists" :command="list.command" :index="list.index">{{list.name}}</fvr-dropdown-item>
          </fvr-dropdown-menu>
      </el-dropdown>
      `,
  props: ['lists'],
  components: {
    "fvr-dropdown-item": fvrDropdownItem,
    'fvr-dropdown-menu': fvrDropdownMenu,
  },
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    handleCommand(str) {
      this.$emit('command', str);
    },
    hover(res) {
      this.isHover = res;
    },
  },
}

/**
 * define aside bar component
 * @type {Object}
 */
export const fvrAside = {
  template: `<el-aside class='fvr-aside'><slot /></el-aside>`,
}

/**
 * define main frame component
 * @type {Object}
 */
export const fvrMain = {
  template: `<el-main class='fvr-main'><slot /></el-main>`,
}

/**
 * define a menu component
 * @type {Object}
 */
export const fvrMenu = {
  template: `<el-menu class='fvr-menu' collapse='collapse' @select='handleEvent'><slot/></el-menu>`,
  methods: {
    handleEvent(key, keyPath) {
      console.log(key)
      this.$emit('choose', key)
    }
  }
}

/**
 * define a submenu component
 * @type {Object}
 */
export const fvrSubmenu = {
  template: `<div>
      <el-submenu :index='index' class="fvr-submenu">
        <template slot='title' class="fvr-submenu--title">
          <i :class='icon'></i>
          <i>{{ label }}</i>
        </template>
        <slot />
      </el-submenu>
    </div>`,
  props: ['index', 'icon', 'label'],
}

/**
 * define a menu item group component
 * @type {Object}
 */
export const fvrMenuItemGroup = {
  template: `<el-menu-item-group class='fvr-menu-item-group'>
      <template slot='title'>
        <i :class='icon'></i>
        <i>{{ label }}</i>
      </template>
      <slot />
    </el-menu-item-group>`,
  props: ['icon', 'label', ],
}

export const fvrMenuItem = {
  template: `<div>
      <el-menu-item :class="['fvr-menu-item', typeof topline !== 'undefined' ? 'fvr-menu-item--topline': '']" :route="route" @click="enter" :index="index">
        <i :class='icon'></i>
        <i><slot /></i>
      </el-menu-item>
    </div>`,
  props: ['icon', 'index', 'topline', "route", ],
  methods: {
    enter() {
      if (this.route) {
        navigateTo(this.route)
      }
    },
  },
};

const Components = {
  // fvrContainer, fvrBanner, fvrFont, fvrUserNameInput, fvrPasswordInput, fvrCaptcha,
  // fvrCheckbox, fvrRow, fvrAvatar, fvrDropdown, fvrAside, fvrMain, fvrMenu, fvrSubmenu,
  // fvrMenuItemGroup, fvrMenuItem
  install(Vue) {
    Vue.component('fvr-container', fvrContainer);
    Vue.component('fvr-banner', fvrBanner);
    Vue.component('fvr-font', fvrFont);
    Vue.component('fvr-username-input', fvrUserNameInput);
    Vue.component('fvr-password-input', fvrPasswordInput);
    Vue.component('fvr-captcha', fvrCaptcha);
    Vue.component('fvr-checkbox', fvrCheckbox);
    Vue.component('fvr-row', fvrRow);
    Vue.component('fvr-avatar', fvrAvatar);
    Vue.component('fvr-dropdown', fvrDropdown);
    Vue.component('fvr-aside', fvrAside);
    Vue.component('fvr-main', fvrMain);
    Vue.component('fvr-menu', fvrMenu);
    Vue.component('fvr-submenu', fvrSubmenu);
    Vue.component('fvr-menu-item-group', fvrMenuItemGroup);
    Vue.component('fvr-menu-item', fvrMenuItem);
  },
};
export default Components;
