/**
 * @file    this is a components defination file for flexiv front-end webpage
 * @author  yubin.fu <yubin.fu@flexiv.com>
 */

 /**
  * component container
  * @type { object }
  */
export const fvrContainer = {
    template: `<el-container class='fvr-container'><slot></slot></el-container>`,
    created() {
    }
}

/**
 * define font-size
 * @type { array }
 */
const FontSize = ['xl','l','m','b','s','xs']

/**
 * define font component
 * @type { object }
 */
export const fvrFont = {
    template: `<span :class="['fvr-font-'+ size, 'fvr-font-color-' + type]" :style="{display: display}"><slot /></span>`,
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
        },
        display: {
            default: 'inline',
            validator(value) {
                return ["inline", "block", "inline-block", ].indexOf(value.toLowerCase()) !== -1;
            }
        },
    },
    created() {
    }
}

 /**
  * component banner
  * @type { object }
  */
export const fvrBanner = {
    template: `<el-header class='fvr-banner'>
                <el-row type='flex' style='width: 100%' align='middle'>
                        <i class='fvr-logo'></i>
                        <fvr-font size='xl' class='fvr-fullfill'>Flexiv Cloud Studio</fvr-font>
                        <slot></slot>
                </el-row>
            </el-header>`,
    components: {
        'fvr-font': fvrFont,
    }
}
/**
 * define input component
 */
export const fvrInput = {
    template: `<div :class="['fvr-input-outside', 'fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']" :style="{width: width}">
        <el-row type='flex' align='middle' :class="['fvr-input-' + (border || 'underline'), 'fvr-font-l']">
            <i v-if="newPrepend" :class="[newPrepend, 'fvr-icon']"></i>
            <input class="fvr-input-inside fvr-font-color-default" @keyup="submit" :required="isRequired" @focus="focus" @blur="blur" :placeholder="newPlaceholder" :name="newName" v-model="value" :type="newType"/>
        </el-row>
        <el-row type='flex' justify='end' v-if="newError" class="fvr-input--error">
            <fvr-font size='m' v-bind:type='fontType'>{{ newError }}</fvr-font>
        </el-row>
    </div>`,
    props: ["placeholder", "name", "required", "value", "error", "width", "type", "prepend", "border"],
    data() {
        return {
            isFocus: false,
            newPrepend: this.prepend,
        }
    },
    computed: {
        newName() {
            return this.name;
        },
        isRequired() {
            return this.required !== undefined ? true : false;
        },
        newPlaceholder() {
            return this.placeholder
        },
        newType() {
            return this.type;
        },
        fontType() {
            return this.newError !== '' ? 'error' : 'default'
        },
        newError(){
            return this.error || ''
        },
    },
    methods: {
        focus() {
            this.isFocus = true;
        },
        blur() {
            this.isFocus = false;
            this.newError = this.newVal === "" ? "this is required" : ""
        },
        submit() {
            this.$emit("input", this.newVal);
        },
    },
}

/**
 * define username input component
 * @type { object }
 */
export const fvrUserNameInput = {
    template:   `
        <div class='fvr-input-outside' :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
            <el-row type='flex' align='middle' class='fvr-input-underline fvr-font-l'>
                <i class='el-icon-user'></i>
                <input class='fvr-input-inside fvr-font-color-default' v-bind:placeholder='placeholder' :name='name' v-model='value' @keyup='submit' :required='required' @focus='focus' @blur='blur' ref='input' autocomplete='off' />
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
        }
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
    template:   `
        <div class='fvr-input-outside' :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
            <el-row type='flex' align='middle' class='fvr-input-underline fvr-font-l'>
                <i class='el-icon-lock'></i>
                <input class='fvr-input-inside fvr-font-color-default' :placeholder='placeholder' :name='name' :type='type' v-model='value' @change='submit' :required='required' @focus='focus' @blur='blur' ref='input' autocomplete='off' />
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
            return this.error !== '' ? 'error':'default'
        },
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
                        <input class='fvr-input-inside fvr-font-color-default' :placeholder='placeholder' :name='name' v-model='value' @change='submit' :value='value' :required='required' @focus='focus' @blur='blur' ref='input' />
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
        <el-row :type='newType' class='fvr-row' :justify='newJustify' :align='newAlign' :gutter="newGutter">
            <slot></slot>
        </el-row>
    `,
    props: ['justify', 'align', "type", "gutter", ],
    data() {
        return {
            newJustify: this.justify,
            newAlign: this.align,
            newType: this.type,
            newGutter: this.gutter,
        }
    },
}

/**
 * define column component
 */
export const fvrCol = {
    template: `<el-col :xs="newXs" :sm="newSm" :md="newMd" :lg="newLg" :xl="newXl" :span="newSpan"><slot/></el-col>`,
    props: ["xs", "sm", "md", "lg", "xl", "span", ],
    data() {
        return {
            newXs: this.xs,
            newSm: this.sm,
            newMd: this.md,
            newLg: this.lg,
            newXl: this.xl,
            newSpan: this.span,
        }
    },
}


/**
 * define avatar component
 */
export const fvrAvatar = {
    template: `
        <el-avatar :src='src' icon="el-icon-user"></el-avatar>
    `,
    props: ['src'],
}

/**
 * define dropdown item component
 */
export const fvrDropdownItem = {
    template: `<el-dropdown-item :command="command"><slot></slot></el-dropdown-item>`,
    props: ['command'],
}

/**
 * define dropdown menu component
 */
export const fvrDropdownMenu = {
    template: `<el-dropdown-menu :slot="name" class="fvr-dropdown-menu"><slot></slot></el-dropdown-menu>`,
    props: ["name"],
}

/**
 * define dropdown component
 */
export const fvrDropdown = {
    template: `
    <el-dropdown @command="handleCommand" :class="['fvr-dropdown', isHover ? 'fvr-dropdown-hover' : '']" @visible-change='hover'>
        <span class="el-dropdown-link"><i class="el-icon--right el-icon-arrow-down"></i></span>
        <fvr-dropdown-menu name="dropdown">
            <fvr-dropdown-item v-for="list in lists" :key="list.name" :command="list.command">{{ list.name }}</fvr-dropdown-item>
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
  template: `<el-aside class='fvr-aside'><slot></slot></el-aside>`,
}

/**
 * define main frame component
 * @type {Object}
 */
export const fvrMain = {
  template: `<el-main class='fvr-main'><slot></slot></el-main>`,
}

/**
 * define a menu component
 * @type {Object}
 */
export const fvrMenu = {
  template: `<el-menu :class="['fvr-menu', collapse ? 'fvr-menu--collapse': '']" collapse='collapse' @select='handler'>
    <slot></slot>
    <div class="fvr-menu--span"></div>
    <fvr-menu-item :icon="[collapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']" topline @click.native.stop.capture="triggerCollapse" index="collapse">Collapse sidebar</fvr-menu-item>
  </el-menu>`,
  data() {
      return {
          collapse: false,
      }
  },
  methods: {
      handler(key, keyPath) {
          this.$emit('handler', key, keyPath);
      },
      triggerCollapse() {
        this.collapse = !this.collapse;
      }
  }
}

/**
 * define a submenu component
 * @type {Object}
 */
export const fvrSubmenu = {
  template: `<div>
    <el-submenu :index='newIndex' class="fvr-submenu">
      <template slot='title' class="fvr-submenu--title">
        <i :class='icon'></i>
        <i class='fvr-menu-item--label'>{{ label }}</i>
      </template>
      <slot></slot>
    </el-submenu>
  </div>`,
  props: ['index', 'icon', 'label'],
  computed: {
      newIndex() {
          return this.index;
      },
  },
}

/**
 * define a menu item group component
 * @type {Object}
 */
export const fvrMenuItemGroup = {
  template: `<div>
  <el-menu-item-group class='fvr-menu-item-group'>
    <template slot='title'>
      <i :class='icon'></i>
      <i>{{ label }}</i>
    </template>
    <slot></slot>
  </el-menu-item-group></div>`,
  props: ['icon', 'label', ],
}

export const fvrMenuItem = {
  template: `<div>
    <el-menu-item :class="['fvr-menu-item', typeof topline !== 'undefined' ? 'fvr-menu-item--topline': '']" :index="newIndex">
      <i :class='icon'></i>
      <i class='fvr-menu-item--label'><slot/></i>
      <span slot='title' class='fvr-menu-item--title'>
        <slot/>
      </span>
    </el-menu-item>
  </div>`,
  props: ['icon', 'index', 'topline', ],
  computed: {
      newIndex() {
          return this.index;
      },
  },
};

/**
 * select component
 */
export const fvrSelect = {
    template: `<el-select v-model="value" :placeholder="newPlaceholder" @change="submit" :multiple="multiple" collapse-tags no-data-text="empty content" :class="['fvr-select', typeof underline !=='undefined' ? 'fvr-select--underline': '', ]">
        <el-option
            v-for="item in newOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>`,
    props: ["value", "placeholder", "options", "multiple", "underline", ],
    data() {
        return {
            newPlaceholder: this.placeholder,
            newMultiple: this.multiple,
        }
    },
    computed: {
        newOptions() {
            return this.options
        },
    },
    methods: {
        submit() {
            this.$emit("input", this.value);
        },
    },
}

/**
 * define button component
 */
export const fvrButton = {
    template: `
        <el-button :class="['fvr-button', newType ? 'fvr-button--' + newType : '']" :circle="isCircle" :icon="newIcon" :size="newSize" :type="newType"><slot/></el-button>
    `,
    props: {
        circle: Boolean,
        icon: String,
        size: String,
        type: String,
    },
    data() {
        return {
            isCircle: this.circle,
            newIcon: this.icon,
            newSize: this.size,
            newType: this.type,
        }
    },
}

/**
 * breadcrumb component
 */
const fvrBreadcrumb = {
    template: `
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in path" to="{path: item.path}">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    `,
    props: ["path", ],
}

/**
 * define a table component
 */
export const fvrTable = {
    template: `
        <el-table :data="tableData" empty-text="no data">
            <slot></slot>
        </el-table>
    `,
    props: ["data", ],
    computed: {
        tableData() {
            return this.data;
        }
    }
}

/**
 * define a table column component
 */
export const fvrTableColumn = {
    template: `
        <el-table-column :prop="newProp" :label="newLabel" :index="newIndex" :type="newType" :width="width">
            <template v-for="(index, name) in $slots" :slot="name">
                <slot :name="name" />
            </template>
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="slotProps">
                <slot :name="name" v-bind="slotProps"></slot>
            </template>
        </el-table-column>
    `,
    props: ["prop", "label", "type", "index", "width", ],
    data() {
        return {
            newProp: this.prop,
            newLabel: this.label,
            newType: this.type,
            newIndex: this.index,
        }
    },
}

/**
 * define pagination component
 */
export const fvrPagination = {
    template: `<div class="fvr-panination">
    <fvr-font>Page</fvr-font>
    <fvr-font>{{ curPage }}</fvr-font>
    <fvr-font>of</fvr-font>
    <fvr-font>{{ totalPage }}</fvr-font>
    <fvr-font>Go to</fvr-font>
    <input :value="curPage" @keydown.enter.prevent="currentChange($event)"></input>
    <fvr-font></fvr-font>
    </div>`,
    props: ["size", "total", "cur"],
    data() {
        return {
            curPage: this.cur,
        }
    },
    computed: {
        totalPage() {
            const total = Math.ceil(this.total / this.size);
            return total;
        },
    },
    methods: {
        currentChange({ currentTarget }) {
            let page = currentTarget.value;
            page = page > this.totalPage ? this.totalPage : page < 1 ? 1 : page;
            this.curPage = page
            this.$emit("current-change", page)
        },
    },
}

/**
 * define dialog component
 */
export const fvrDialog = {
    // template: `<el-dialog :visible="newVisible" :before-close="handlerClose" close-on-click-modal class="fvr-dialog" :width="newWidth">
    //     <template v-for="(index, name) in $scopedSlots" v-slot:[name]="slotProps">
    //         <slot :name="name" v-bind="newData"></slot>
    //     </template>
    //     <template v-for="(index, name) in $slots" :slot="name">
    //         <slot :name="name"></slot>
    //     </template>
    // </el-dialog>`,
    props: ["visible", "title", "width", "data", ],
    render(h) {
      const self = this;
      return h("el-dialog", {
        props: {
          visible: self.newVisible,
        },
        scopedSlots: {
          default: props => h('div', props.text),
        },
      }, );
    },
    data() {
        return {
            newTitle: this.title,
            newWidth: this.width,
        }
    },
    computed: {
        newVisible() {
            return this.visible;
        },
        newData() {
          return this.data;
        },
    },
    methods: {
        handlerClose(done) {
            done();
        }
    },
    mounted() {
      // for (var name in this.$scopedSlots) {
      //   console.log(this.$scopedSlots[name](), name)
      // }
      console.log(this.$scopedSlots.default(props => {
        console.log(props.text);
      }));
    },
}

export const slot1 = {
  // template: `<div>
  //   <div>你好: {{ user.id }}</div>
  //   <slot name="title"></slot>
  //   <slot v-bind="user"></slot>
  // </div>`,
  props: ["value", ],
  render(h) {
    const self = this;
    return h('div', {
    }, [
      h('div', `你好${self.value.id}`),
      this.$slots.title,
      this.$scopedSlots.default(self.value),
    ])
  },
}


/**
 * as a plugin to install all the fvr-components
 */
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
    Vue.component('fvr-col', fvrCol);
    Vue.component('fvr-avatar', fvrAvatar);
    Vue.component('fvr-dropdown', fvrDropdown);
    Vue.component('fvr-aside', fvrAside);
    Vue.component('fvr-main', fvrMain);
    Vue.component('fvr-menu', fvrMenu);
    Vue.component('fvr-submenu', fvrSubmenu);
    Vue.component('fvr-menu-item-group', fvrMenuItemGroup);
    Vue.component('fvr-menu-item', fvrMenuItem);
    Vue.component('fvr-input', fvrInput);
    Vue.component("fvr-select", fvrSelect);
    Vue.component("fvr-button", fvrButton);
    Vue.component("fvr-breadcrumb", fvrBreadcrumb);
    Vue.component("fvr-table", fvrTable);
    Vue.component("fvr-table-column", fvrTableColumn);
    Vue.component("fvr-pagination", fvrPagination);
    Vue.component("fvr-dialog", fvrDialog);
    Vue.component("slot1", slot1);
  },
};
export default Components;
