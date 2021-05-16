<template>
  <footer
    class="footer"
    :data-background-color="backgroundColor"
  >
    <div class="container w-100 clearfix">
      <div class="copyright">
        &copy; {{ year }}, Designed by
        Zee <i class="mdi mdi-heart-outline text-danger"></i>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'footer',
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
