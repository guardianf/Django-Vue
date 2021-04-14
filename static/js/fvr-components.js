/**
 * @file    this is a components defination file for front-end webpage
 * @author  yubin.fu <578248377@qq.com>
 */

 /**
  * component container
  * @type { object }
  */
export const fvrContainer = {
    template: `<el-container class="fvr-container"><slot></slot></el-container>`,
}

/**
 * define font-size
 * @type { array }
 */
const FontSize = ["xl", "l", "m", "b", "s","xs", ];

/**
 * define font component
 * @type { object }
 */
export const fvrFont = {
    template: `<span :class="['fvr-font-'+ size, 'fvr-font-color-' + type]" :style="{display: display}"><slot></slot></span>`,
    props: {
        size: {
            type: String,
            default: "b",
            validator(value) {
                return FontSize.indexOf(value.toLowerCase()) !== -1;
            },
        },
        type: {
            default: "default",
            validator(value) {
                return ["error", "default"].indexOf(value.toLowerCase()) !== -1;
            },
        },
        display: {
            default: "inline",
            validator(value) {
                return ["inline", "block", "inline-block", ].indexOf(value.toLowerCase()) !== -1;
            },
        },
    },
}

 /**
  * component banner
  * @type { object }
  */
export const fvrBanner = {
    template: `<el-header class="fvr-banner">
                <el-row type="flex" style="width: 100%" align="middle">
                        <i class="fvr-logo"></i>
                        <fvr-font size="xl" class="fvr-fullfill">Cloud Studio</fvr-font>
                        <slot></slot>
                </el-row>
            </el-header>`,
    components: {
        "fvr-font": fvrFont,
    },
}

/**
 * define input component
 */
export const fvrInput = {
    template: `<div :class="['fvr-input-outside', 'fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']" :style="{width: width}">
        <el-row type="flex" align="middle" :class="['fvr-input-' + border, 'fvr-font-l']">
            <i v-if="prepend" :class="[prepend, 'fvr-icon']"></i>
            <el-input
                v-model="value"
                class="fvr-input fvr-input-inside fvr-font-color-default"
                :clearable="clearable"
                :disabled="disabled"
                :required="isRequired"
                :placeholder="newPlaceholder"
                :name="newName"
                :type="newType"
                @change="submit"
                @focus="focus"
                @blur="blur"
            ></el-input>
            <slot name="append"></slot>
        </el-row>
        <el-row type="flex" justify="end" v-if="newError" class="fvr-input--error">
            <fvr-font size="m" v-bind:type="fontType">{{ newError }}</fvr-font>
        </el-row>
    </div>`,
    props: {
        placeholder: {
            type: String,
        },
        name: {
            type: String,
        },
        required: {
            type: Boolean,
            default: false,
        },
        value: {

        },
        error: {
            type: String,
            default: "",
        },
        width: {
            type: [String, Number],
        },
        type: {
            type: String,
            default: "text",
        },
        prepend: {
            type: String,
        },
        append: {
            type: String,
        },
        border: {
            type: String,
            default: "underline",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFocus: false,
        }
    },
    computed: {
        newName() {
            return this.name;
        },
        isRequired() {
            return this.required;
        },
        newPlaceholder() {
            return this.placeholder;
        },
        newType() {
            return this.type;
        },
        fontType() {
            return this.newError !== "" ? "error" : "default";
        },
        newError(){
            return this.error;
        },
    },
    methods: {
        focus() {
            this.isFocus = true;
        },
        blur() {
            this.isFocus = false;
            this.newError = this.value === "" ? "this is required" : "";
            this.$emit("blur", this.value);
        },
        submit() {
            this.$emit("input", this.value);
        },
    },
}

/**
 * define username input component
 * @type { object }
 */
export const fvrUserNameInput = {
    template:   `
        <div class="fvr-input-outside" :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
            <el-row type="flex" align="middle" class="fvr-input-underline fvr-font-l">
                <i class="el-icon-user" style="margin-right: 5px;"></i>
                <input class="fvr-input-inside fvr-font-color-default" v-bind:placeholder="placeholder" :name="name" v-model="value" @keyup="submit" :required="required" @focus="focus" @blur="blur" ref="input" autocomplete="off" />
            </el-row>
            <el-row type="flex" justify="end">
                <fvr-font size="m" v-bind:type="fontType">{{ error }}</fvr-font>
            </el-row>
        </div>
    `,
    props: ["name", "placeholder", "value", "error", "width", "required", ],
    components: {
        "fvr-font": fvrFont,
    },
    computed: {
        fontType() {
            return this.error !== "" ? "error" : "default";
        },
    },
    data() {
        return {
            isFocus: false,
        }
    },
    methods: {
        submit() {
            this.$emit("input", this.value);
        },
        focus() {
            this.$refs.input.focus();
            this.isFocus = true;
        },
        blur() {
            this.isFocus = false;
        },
    },
}

/**
 * define password input component
 * @type { object }
 */
export const fvrPasswordInput = {
    template:   `
        <div class="fvr-input-outside" :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
            <el-row type="flex" align="middle" class="fvr-input-underline fvr-font-l">
                <i class="el-icon-lock" style="margin-right: 5px;"></i>
                <input class="fvr-input-inside fvr-font-color-default" :placeholder="placeholder" :name="name" :type="type" v-model="value" @change="submit" :required="required" @focus="focus" @blur="blur" ref="input" autocomplete="off" />
                <i :class="['fa', type == 'password' ? 'fa-eye': 'fa-eye-slash' ]" @click="toggleInput"></i>
            </el-row>
            <el-row type="flex" justify="end">
                <fvr-font size="m" :type="fontType">{{ error }}</fvr-font>
            </el-row>
        </div>
    `,
    props: ["name", "placeholder", "value", "error", "required", ],
    components: {
        "fvr-font": fvrFont,
    },
    data() {
        return {
            type: this.name == "password" ? "password" : "",
            isFocus: false,
        }
    },
    computed: {
        fontType() {
            return this.error !== "" ? "error":"default";
        },
    },
    methods: {
        toggleInput() {
            this.type = this.type === "password" ? "" : "password";
        },
        submit() {
            this.$emit("input", this.value);
        },
        focus() {
            this.$refs.input.focus();
            this.isFocus = true;
        },
        blur() {
            this.isFocus = false;
        },
    },
}

/**
 * define captcha input component
 * @type { object }
 */
export const fvrCaptcha = {
    template: `
    <div class="fvr-input-outside" :class="['fvr-input-' + type, isFocus? 'fvr-input-focus' : '']">
            <el-row type="flex" align="middle" class="fvr-font-l">
                <el-col :span="15">
                    <el-row type="flex" justify="start" align="middle" class="fvr-input-underline">
                        <input class="fvr-input-inside fvr-font-color-default" :placeholder="placeholder" :name="name" v-model="value" @change="submit" :value="value" :required="required" @focus="focus" @blur="blur" ref="input" />
                    </el-row>
                </el-col>
                <el-col :span="8" :offset="1">
                    <el-row type="flex" justify="end" align="middle">
                        <img :src="src" @click="refresh" />
                    </el-row>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <fvr-font size="m" :type="type">{{ error }}</fvr-font>
            </el-row>
        </div>
    `,
    props: ["value", "placeholder", "error", "name", "required", ],
    components: {
        "fvr-font": fvrFont,
    },
    data() {
        return {
            src: "/api/v1/captcha/",
            isFocus: false,
        }
    },
    computed: {
        type() {
            return this.error !== "" ? "error" : "default";
        },
    },
    methods: {
        submit() {
            this.$emit("input", this.value);
        },
        refresh() {
            this.src = "/api/v1/captcha/?t=" + Math.random();
        },
        focus() {
            this.$refs.input.focus();
            this.isFocus = true;
        },
        blur() {
            this.isFocus = false;
        },
    },
}

/**
 * define checkbox component
 * @type { object }
 */
export const fvrCheckbox = {
    template: `
        <div class="fvr-checkbox">
            <el-checkbox v-model="value" true-label="yes" false-label="no" @change="submit" :disabled="disabled" :checked="checked">{{ label }}</el-checkbox>
        </div>
    `,
    // props: ["label", "value", ],
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: Boolean,
            default: "no",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        checked: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        submit() {
            this.$emit("input", this.value);
        },
    },
}

/**
 * define row component
 * @type { object }
 */
export const fvrRow = {
    template: `
        <el-row :type="newType" class="fvr-row" :justify="newJustify" :align="newAlign" :gutter="newGutter">
            <slot></slot>
        </el-row>
    `,
    props: ["justify", "align", "type", "gutter", ],
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
    template: `<el-col :xs="newXs" :sm="newSm" :md="newMd" :lg="newLg" :xl="newXl" :span="newSpan"><slot></slot></el-col>`,
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
        <el-avatar :src="src" icon="el-icon-user"></el-avatar>
    `,
    props: ["src"],
}

/**
 * define dropdown item component
 */
export const fvrDropdownItem = {
    template: `<el-dropdown-item :command="command"><slot></slot></el-dropdown-item>`,
    props: ["command", ],
}

/**
 * define dropdown menu component
 */
export const fvrDropdownMenu = {
    template: `<el-dropdown-menu :slot="name" class="fvr-dropdown-menu"><slot></slot></el-dropdown-menu>`,
    props: ["name", ],
}

/**
 * define dropdown component
 */
export const fvrDropdown = {
    template: `
    <el-dropdown @command="handleCommand" :class="['fvr-dropdown', isHover ? 'fvr-dropdown-hover' : '']" @visible-change="hover">
        <span class="el-dropdown-link"><i class="el-icon--right el-icon-arrow-down"></i></span>
        <fvr-dropdown-menu name="dropdown">
            <fvr-dropdown-item v-for="list in lists" :key="list.name" :command="list.command">{{ list.name }}</fvr-dropdown-item>
        </fvr-dropdown-menu>
    </el-dropdown>
    `,
    props: ["lists", ],
    components: {
        "fvr-dropdown-item": fvrDropdownItem,
        "fvr-dropdown-menu": fvrDropdownMenu,
    },
    data() {
        return {
            isHover: false,
        }
    },
    methods: {
        handleCommand(str) {
            this.$emit("command", str);
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
  template: `<el-aside class="fvr-aside"><slot></slot></el-aside>`,
}

/**
 * define main frame component
 * @type {Object}
 */
export const fvrMain = {
  template: `<el-main class="fvr-main"><slot></slot></el-main>`,
}

/**
 * define a menu component
 * @type {Object}
 */
export const fvrMenu = {
  template: `<el-menu :collapse="collapse" @select="handler" :class="['fvr-menu', collapse ? 'fvr-menu--collapse': '']" unique-opened :default-active="active" style="transition: 0.3s">
    <slot></slot>
    <div class="fvr-menu--span"></div>
    <fvr-menu-item :icon="[collapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']" topline @click.native.stop.capture="triggerCollapse" index="collapse">Collapse sidebar</fvr-menu-item>
  </el-menu>`,
  props: {
    active: {
        type: String,
    },
    collapse: {
        type: Boolean,
        default: false,
    },
    menus: {
      type: Object,
      default: {},
    },
  },
  data() {
      return {
      }
  },
  methods: {
      handler(key, keyPath) {
          this.$emit("handler", key, keyPath);
      },
      triggerCollapse() {
        this.collapse = !this.collapse;
      },
  },
}

/**
 * define a submenu component
 * @type {Object}
 */
export const fvrSubmenu = {
  template: `<div>
    <el-submenu :index="newIndex" class="fvr-submenu">
      <template slot="title" class="fvr-submenu--title">
        <i :class="[icon, 'fvr-submenu--icon']"></i>
        <span slot="title" class="fvr-menu-item--label">{{ label }}</span>
      </template>
      <slot></slot>
    </el-submenu>
  </div>`,
  props: ["index", "icon", "label", ],
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
    <el-menu-item-group class="fvr-menu-item-group">
        <span slot="title">{{ label }}</span>
        <slot></slot>
    </el-menu-item-group>
  </div>`,
  props: ["icon", "label", ],
}

/**
 * define menu item component
 */
export const fvrMenuItem = {
  template: `<div>
    <el-menu-item :class="['fvr-menu-item', typeof topline !== 'undefined' ? 'fvr-menu-item--topline': '']" :index="newIndex">
      <i :class="[icon, 'fvr-menu-item--icon']"></i>
      <span slot="title" class="fvr-menu-item--label">
        <slot></slot>
      </span>
    </el-menu-item>
  </div>
  `,
  props: ["icon", "index", "topline", ],
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
    template: `<el-select v-model="newValue" :placeholder="newPlaceholder" @change="submit" :multiple="newMultiple" collapse-tags no-data-text="empty content" :class="['fvr-select', underline ? 'fvr-select--underline': '', ]" popper-class="fvr-select--dropdown" :filterable="filterable">
        <el-option
            v-for="item in newOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>`,
    props: {
        value: {},
        placeholder: {
            type: String,
            default: "Please Choose",
        },
        options: {
            type: Array,
            default: [],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        default: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            newPlaceholder: this.placeholder,
            newMultiple: this.multiple,
        }
    },
    computed: {
        newOptions() {
            return this.options;
        },
        newValue() {
            let ret;
            if(this.newMultiple) {
                ret = this.value;
            } else {
                ret = this.options.map(item => item.value).indexOf(this.value) !== -1 ? this.value: this.default ? (this.options[0] && this.options[0].value) : "";
                if(this.default) {
                    this.$emit("input", ret);
                }
            }
            return ret;
        },
    },
    methods: {
        submit(val) {
            this.$emit("input", val);
        },
    },
}

/**
 * define button component
 */
export const fvrButton = {
    template: `
        <div>
          <el-tooltip v-if="newContent" :content="newContent" placement="top-start" hide-after="1000">
              <el-button :class="['fvr-button', newType ? 'fvr-button--' + newType : '']" :circle="isCircle" :icon="newIcon" :size="newSize" :type="newType" :disabled="disabled"><slot></slot></el-button>
          </el-tooltip>
          <el-button v-else :class="['fvr-button', newType ? 'fvr-button--' + newType : '']" :circle="isCircle" :icon="newIcon" :size="newSize" :type="newType" :disabled="disabled"><slot></slot></el-button>
        </div>
    `,
    props: {
        circle: Boolean,
        icon: String,
        size: String,
        type: String,
        disabled: {
            type: Boolean,
            default: false,
        },
        content: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isCircle: this.circle,
            newIcon: this.icon,
            newSize: this.size,
            newType: this.type,
            newContent: this.content,
        }
    },
}

/**
 * breadcrumb component
 */
const fvrBreadcrumb = {
    template: `
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in path" :to="{path: item.path}" @click.native="handleClick(item)">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    `,
    props: ["path", ],
    methods: {
        handleClick(item) {
            this.$emit("click", item.path);
        },
    },
}

/**
 * define a table component
 */
export const fvrTable = {
    template: `
        <el-table :data="tableData" empty-text="no data" class="fvr-table">
            <slot></slot>
        </el-table>
    `,
    props: ["data", ],
    computed: {
        tableData() {
            return this.data;
        },
    },
}

/**
 * define a table column component
 */
export const fvrTableColumn = {
    template: `
        <el-table-column :prop="newProp" :label="newLabel" :index="newIndex" :type="newType" :width="width">
            <template v-for="(index, name) in $slots" :slot="name">
                <slot :name="name"></slot>
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
    template: `
    <div class="fvr-pagination">
        <el-pagination
            popper-class="fvr-pagination-dropdown"
            layout="total, prev, pager, next, jumper"
            :page-count="size"
            :current-page="curPage"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
        ></el-pagination>
    </div>`,
    props: {
        size: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
        cur: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            reserveInput: this.cur,
            curPage: this.cur,
            listVisible: false,
        }
    },
    computed: {
        totalPage() {
            const total = Math.ceil(this.total / this.size) || 1;
            return total;
        },
        pageRange() {
            return Array.apply(null, {length: this.totalPage}).map((item, index) => index + 1);
        },
        pageOptions() {
            return this.pageRange.map(index => {
                return {
                    label: index,
                    value: index,
                }
            });
        },
        inputWidth() {
            let ret = 1;
            let remain = this.curPage;
            while(remain >= 10) {
                remain = Math.floor(remain / 10)
                ret += 1;
            };
            return `width: ${15 + ret * 8}px;`;
        },
        listWidth() {
            let ret = 1;
            let remain = this.curPage;
            while(remain >= 10) {
                remain = Math.floor(remain / 10)
                ret += 1;
            };
            return `width: ${48 + ret * 8}px;`;
        },
    },
    methods: {
        currentChange(page) {
            this.curPage = page;
            this.$emit("current-change", page);
        },
        validInput({ target, keyCode, which, }) {
            const key = keyCode || which;
            if(key === 8 || key === 13) {
                return;
            }
            const curValue = parseInt(this.curPage);
            if(!this.pageRange.includes(curValue)) {
                this.curPage = this.reserveInput;
            } else {
                this.curPage = curValue
                this.reserveInput = curValue;
            }
        },
        showSelector({ target, }) {
            target.style.transform = target.style.transform ? "" : "rotate(-180deg)";
            this.listVisible = !this.listVisible;
        },
        selectLi({ target, }) {
            this.curPage = target.value;
            this.listVisible = false;
            this.currentChange();
        },
        sizeChange(size) {
            const curPage = Math.ceil((this.size * (this.curPage - 1) + 1) / size)
            this.$emit("size-change", size, curPage);
        }
    },
}

/**
 * define dialog component
 */
export const fvrDialog = {
    template: `<div><el-dialog :show-close="showClose" :visible.sync="newVisible" :before-close="handleClose" :width="newWidth" class="fvr-dialog">
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="slotProps">
            <slot :name="name" v-bind="newData"></slot>
        </template>
        <template v-for="(index, name) in $slots" :slot="name">
            <slot :name="name"></slot>
        </template>
    </el-dialog></div>`,
    props: ["visible", "width", "data", ],
    data() {
        return {
            newTitle: this.title,
            newWidth: this.width,
            showClose: false,
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
        handleClose(done) {
            done();
        },
    },
}

export const fvrConfirmDialog = {
    template: `<template>
        <fvr-dialog :visible="visible" width="521px">
            <fvr-font slot="title" size="xl">Alert</fvr-font>
            <fvr-font>{{ newMessage }}</fvr-font>
            <template slot="footer">
                <fvr-button type="icon" @click.native="close" icon="el-icon-close"></fvr-button>
                <fvr-button type="icon" @click.native="confirm" icon="el-icon-check"></fvr-button>
            </template>
        </fvr-dialog>
    </template>`,
    props: {
        message: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            newMessage: this.message,
            visible: false,
        }
    },
    methods: {
        close() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        },
        confirm() {
            this.close();
            this.$emit("confirm");
        },
    },
}
export const fvrTablePage = {
  template: `<div class="fvr-table">
    <el-table
      empty-text="no data"
      :url="url"
      :data="data"
    >
      <el-table-column type="index" :index="getIndex"></el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope" v-for="btn in item.btns">
          <div @click="btn.handleClick(scope.$index, scope.row)">{{ btn.label }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>`,
  props: {
    columns: {
      type: Array,
      default: [],
    },
    url: {
      type: String,
      default: "",
    },
    list: {
      type: Function,
      default: () => {
        console.log("call list");
      }
    },
  },
  data() {
    return {
      curPage: 1,
      pageSize: 10,
      data: [],
    }
  },
  created() {
    this.data = this.list(this.curPage);
  },
  methods: {
    getIndex(index) {
      return index + 1 + (this.curPage - 1) * this.pageSize;
    },
  },
}

/**
 * as a plugin to install all the fvr-components
 */
const Components = {
  install(Vue) {
    Vue.component("fvr-container", fvrContainer);
    Vue.component("fvr-banner", fvrBanner);
    Vue.component("fvr-font", fvrFont);
    Vue.component("fvr-username-input", fvrUserNameInput);
    Vue.component("fvr-password-input", fvrPasswordInput);
    Vue.component("fvr-captcha", fvrCaptcha);
    Vue.component("fvr-checkbox", fvrCheckbox);
    Vue.component("fvr-row", fvrRow);
    Vue.component("fvr-col", fvrCol);
    Vue.component("fvr-avatar", fvrAvatar);
    Vue.component("fvr-dropdown", fvrDropdown);
    Vue.component("fvr-aside", fvrAside);
    Vue.component("fvr-main", fvrMain);
    Vue.component("fvr-menu", fvrMenu);
    Vue.component("fvr-submenu", fvrSubmenu);
    Vue.component("fvr-menu-item-group", fvrMenuItemGroup);
    Vue.component("fvr-menu-item", fvrMenuItem);
    Vue.component("fvr-input", fvrInput);
    Vue.component("fvr-select", fvrSelect);
    Vue.component("fvr-button", fvrButton);
    Vue.component("fvr-breadcrumb", fvrBreadcrumb);
    Vue.component("fvr-table", fvrTable);
    Vue.component("fvr-table-column", fvrTableColumn);
    Vue.component("fvr-pagination", fvrPagination);
    Vue.component("fvr-dialog", fvrDialog);
    Vue.component("fvr-confirm-dialog", fvrConfirmDialog);
    Vue.component("fvr-table-page", fvrTablePage);
  },
};

export default Components;
