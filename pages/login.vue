<script setup>
const supabase = useSupabaseClient();

// const signInWithPaswd = async () => {
//   const { error } = await supabase.auth.signInWithPassword({
//     email: email.value,
//     password: password.value,
//   })
//   if (error) console.log(error)
// }

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
  console.log("Submitted form:", form);
  if (form.password) {
    const { error } = await supabase.auth.signInWithPassword({
    email: accountForm.mail,
    password: accountForm.password,
  })
  if (error) console.log(error)
  // console.log(data)
  // console.log("accountForm.mail: ", form.mail);
  } else {
      const { data, error } = await supabase.auth.signUp({
      email: newUserForm.newUserName,
      password: newUserForm.newUserPassword,
    })
    if (error) console.log(error)
    // console.log(data);
  //   console.log(form)
  // console.log("newUserForm.newUserName: ", form.newUserName);
  // console.log("newUserForm.newUserPassword: ", form.newUserPassword);
  }
}

</script>
<template>
  <!-- <div>
    <UButton @click="signInWithPaswd">
      Sign In with E-Mail
    </UButton>
    <UInput
      v-model="email"
      type="email"
      placeholder="E-Mail"
      required
    />
    <UInput
      v-model="password"
      type="password"
      placeholder="Password"
      required
    />
  </div> -->

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
            <UInput v-model="newUserForm.newUserName" required />
          </UFormGroup>
          <UFormGroup label="Password" name="password" required>
            <UInput
              v-model="newUserForm.newUserPassword"
              type="password"
              required
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