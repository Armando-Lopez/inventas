<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, default: '' },
  label: { type: String },
  placeholder: { type: String }
})

const { value, errorMessage } = useField(props.name, props.rules)
</script>

<template>
  <label class="form-control">
    <div class="label">
      <span class="label-text text-base">
        {{ props.label }}
        <sup v-if="props.rules.includes('required')" class="text-error">*</sup>
        <sup v-else>(opcional)</sup>
      </span>
    </div>
    <textarea
      v-model.trim="value"
      :placeholder="props.placeholder"
      class="input input-bordered w-full"
      :class="{
        'input-error': !!errorMessage
      }"
    ></textarea>
    <div v-if="errorMessage" class="label">
      <span class="label-text-alt text-error">
        {{ errorMessage.replace(props.name, '') }}
      </span>
    </div>
  </label>
</template>
