<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, default: '' },
  label: { type: String },
  type: { type: String, default: 'text' },
  placeholder: { type: String }
})

const { value, errorMessage } = useField(props.name, props.rules)

const inputType = ref(props.type)
const canSeePassword = ref(false)

const isPassword = props.type === 'password'

function toggleViewPassword() {
  canSeePassword.value = !canSeePassword.value
  inputType.value = canSeePassword.value ? 'text' : 'password'
}
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
    <div class="relative">
      <input
        v-model.trim="value"
        :type="inputType"
        :placeholder="props.placeholder"
        class="input input-bordered w-full"
        :class="{
          'input-error': !!errorMessage
        }"
      />
      <span
        v-if="isPassword"
        class="material-symbols-outlined absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-0 cursor-pointer"
        tabindex="0"
        @click.self="toggleViewPassword"
      >
        {{ canSeePassword ? 'visibility_off' : 'visibility' }}
      </span>
    </div>
    <div class="label">
      <span class="label-text-alt text-error">
        {{ errorMessage?.replace(props.name, '') }}
      </span>
    </div>
  </label>
</template>
