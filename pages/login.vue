<script setup>
const supabase = useSupabaseClient();

const items = [
  {
    key: "login",
    label: "Login",
    description: "Login there!",
  },
  {
    key: "signUp",
    label: "Sign-Up",
    description: "Come and make your account there!",
  },
];
useRedirectIfAuthenticated();

const accountForm = reactive({ mail: "", password: "" });
const newUserForm = reactive({ newUserName: "", newUserPassword: "" });

const onSubmit = async (form) => {
  if (form.password) {
    const { error } = await supabase.auth.signInWithPassword({
    email: accountForm.mail,
    password: accountForm.password,
  })
  if (error) console.log(error)
  } else {
      const { data, error } = await supabase.auth.signUp({
      email: newUserForm.newUserName,
      password: newUserForm.newUserPassword,
    })
    if (error) console.log(error)
  }
}

</script>
<template>
  <UTabs :items="items" class="w-full">
    <template #item="{ item }">
      <UCard
        @submit.prevent="
          () => onSubmit(item.key === 'login' ? accountForm : newUserForm)
        "
      >
        <template #header>
          <p
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>

        <div v-if="item.key === 'login'" class="space-y-3">
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="accountForm.mail" />
          </UFormGroup>
          <UFormGroup label="Password" name="password" required>
            <UInput v-model="accountForm.password" type="password" />
          </UFormGroup>
        </div>
        <div v-else-if="item.key === 'signUp'" class="space-y-3">
          <UFormGroup label="Email" name="username" required>
            <UInput v-model="newUserForm.newUserName" required disabled />
          </UFormGroup>
          <UFormGroup label="Password" name="password" required>
            <UInput
              v-model="newUserForm.newUserPassword"
              type="password"
              required
              disabled
            />
          </UFormGroup>
        </div>

        <template #footer>
          <UButton
            type="submit"
            class="bg-rose-100 text-red-950 hover:bg-red-200 font-semibold"
            variant="outline"
          >
            Save {{ item.key === "login" ? "login" : "signUp" }}
          </UButton>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>