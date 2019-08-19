/**
 * Async Component
 * 
 * This is a renderless component.
 * It is an abstraction for GET requests.
 * Pass a mandatory "url" and an
 * optional "params" object.
 */
const Async = Vue.component('async', {
  props: {
    url: { type: String, default: "", required: true },
    params: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      pending: true,
      error: false,
      data: null
    };
  },
  watch: {
    url() {
      this.requestData();
    },
    params: {
      handler() {
        this.requestData();
      },
      deep: true
    }
  },
  mounted() {
    this.requestData();
  },
  methods: {
    async requestData() {
      this.pending = true;
      try {
        const { data } = await axios.get(this.url, { params: this.params });
        this.data =  data;
        this.error = false;
      } catch (e) {
        this.data = null;
        this.error = e;
      }
      this.pending = false;
    }
  },
  render() {
    return this.$scopedSlots.default({
      pending: this.pending,
      error: this.error,
      data: this.data
    });
  }
});


/*
 * Instantiate Vue App
 */
new Vue({
  el: '#app',
  components: { Async },
  data() {
    return {
      currentBreed: 0,
      breeds: [
        { name: "Golden Retriever", key: "retriever/golden" },
        { name: "German Shepherd", key: "germanshepherd" },
        { name: "Husky", key: "husky" },
        { name: "Pug", key: "pug" },
        { name: "(Error)", key: "error" },
      ]
    }
  },
  computed: {
    breedKey() {
      return this.breeds[this.currentBreed].key;
    }
  }
})