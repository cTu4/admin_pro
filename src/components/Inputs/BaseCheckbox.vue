<template>
  <div>
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>
    <div
        class="custom-control custom-checkbox"
        :class="[
      { disabled: disabled },
      { [`custom-checkbox-${type}`]: type },
      inlineClass,
    ]"
    >
      <input
          :id="cbId"
          class="custom-control-input"
          :class="inputClasses"
          type="checkbox"
          :disabled="disabled"
          v-model="model"
      />
      <label :for="cbId" class="custom-control-label">
        <slot>
          <span v-if="inline">&nbsp;</span>
        </slot>
      </label>
    </div>
  </div>

</template>
<script>
export default {
  name: "base-checkbox",
  emits: ["update:modelValue"],
  model: {
    prop: "modelValue",
  },
  props: {
    modelValue: {
      type: [Array, Boolean],
      description: "Whether checkbox is checked",
    },
    disabled: {
      type: Boolean,
      description: "Whether checkbox is disabled",
    },
    inline: {
      type: Boolean,
      description: "Whether checkbox is inline",
    },
    inputClasses: {
      type: [String, Object, Array],
      description: "Checkbox input classes",
    },
    type: {
      type: String,
      description: "Checkbox type (e.g info, danger etc)",
    },
    label: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    labelClasses: {
      type: String,
      description: "Input label css classes",
      default: "form-control-label",
    },
  },
  data() {
    return {
      cbId: "",
      touched: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(check) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit("update:modelValue", check);
      },
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`;
      }
      return "";
    },
  },
  created() {
    this.cbId = Math.random().toString(16).slice(2);
  },
};
</script>
