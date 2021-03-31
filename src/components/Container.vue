<template>
  <div id="container">
    <Red v-bind:status="data.circles[0].status" v-bind:count="data.count" />
    <Yellow v-bind:status="data.circles[1].status" v-bind:count="data.count" />
    <Green v-bind:status="data.circles[2].status" v-bind:count="data.count" />
    <router-view :data="data" />
  </div>
</template>

<script >
import Red from "./Circle/Red.vue";
import Green from "./Circle/Green.vue";
import Yellow from "./Circle/Yellow.vue";
export default {
  data() {
    return {
      data: {
        circles: [
          { color: "red", status: false, time: 10 },
          { color: "yellow", status: false, time: 3 },
          { color: "green", status: false, time: 13 },
        ],
        currentCircle: {},
        direction: false,
        count: 0,
        blinkTime: 2,
        blinkNum: 4,
      },
    };
  },
  methods: {
    getStartCondition() {
      let index = Math.floor(Math.random() * 3);
      this.data.direction =
        this.data.circles[index].color == "red" ||
        this.data.circles[index].color == "yellow"
          ? false
          : true;
      this.data.currentCircle = { ...this.data.circles[index] };
      this.data.count = this.data.currentCircle.time
    },
    redirect(color) {
      this.$router.replace(color);
    },
    bacisCircleAction(current) {
      this.redirect(current.color);
      this.data.circles.map((item) => {
        item.status = item.color == current.color ? true : false;
      });
      let action = setInterval(() => {
        this.data.count -= 1;
      }, 1000); //обычная работа
      setTimeout(
        () => clearInterval(action),
        (current.time - this.data.blinkTime) * 1000
      ); //интервал без мигания
      setTimeout(() => {
        let blinking = setInterval(() => {
          this.data.circles.map((item) => {
            item.status = item.color == current.color ? !item.status : false;
          });
          this.data.count -= this.data.blinkTime / this.data.blinkNum;
        }, (this.data.blinkTime / this.data.blinkNum) * 1000); // работа с меганием
        setTimeout(
          () => clearInterval(blinking),
          (this.data.blinkTime + this.data.blinkTime / this.data.blinkNum) *
            1000
        );
      }, (current.time - this.data.blinkTime) * 1000); // с миганием /  дилей перед первым, второй - мигание
      setTimeout(() => {
        if (current.color == "green" || current.color == "red") {
          //если текущий цвет красный/зеленый
          this.data.circles.map((item) => {
            item.status = item.color == current.color ? false : item.status;
          }); // если текущий цвет был красным/зеленым, то гасим эти цвета
          this.data.direction = current.color == "red" ? true : false; // в зависимости от текущего цвета устанавливаем следующий цвет после желтого
          current = { ...this.data.circles[1] }; //устанавливаем новый текущий цвет желтый
        } else {
          this.data.circles.map((item) => {
            item.status = item.color == current.color ? false : item.status;
          }); // гасим желтый
          current = this.data.direction //судя по направлению выбираем цвет, следуйщий после желтого
            ? { ...this.data.circles[2] }
            : { ...this.data.circles[0] };
        }
        this.data.count = current.time ; // устанавливает счетчик отсчета
        this.bacisCircleAction(current);
      }, current.time * 1000);
    },
    mainLiveCircle() {
      this.getStartCondition();
      this.redirect(this.data.currentCircle.color);
      this.bacisCircleAction(this.data.currentCircle);
    },
  },
  mounted() {
    this.mainLiveCircle();
  },
  components: {
    Red,
    Yellow,
    Green,
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

.circle {
  width: 50vh;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25vh;
}
.non_active {
  opacity: 0.5;
}
</style>
