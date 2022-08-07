<template>
   <div class="container">
      <div class="not-found">
         <h1>Not Found</h1>
         <router-link :to="{ name: 'Login' }"><span>Login</span> to visit Home Page</router-link>
      </div>
   </div>
</template>

<style scoped>
.not-found {
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: #fff;
   padding: 2rem 3rem;
   border-radius: .5rem;
   margin-top: 10rem;
}

.not-found h1 {
   font-size: 3.2rem;
   font-weight: 700;
   margin-bottom: 1rem;
}

.not-found a {
   font-size: 1.8rem;
}

.not-found span {
   font-weight: 600;
   color: salmon;
   transition: color .35s ease;
}

.not-found span:hover {
   color: rgb(202, 67, 52);
}
</style>