<template>
  <div class="home">
    <Navbar class="app-navbar" />
    <div class="app-content">
      <div class="sidebar">
        <div class="sidebar-block">
          <div class="heading">Wall info</div>

          <div class="input-field">
            <label>Wall height (m)</label>
            <input id="wall-height" v-model="wall.height" />
          </div>

          <div class="input-field">
            <label>Wall width (m)</label>
            <input id="wall-width" v-model="wall.width" />
          </div>
          <div class="input-field">
            <label>Wall thickness (m)</label>
            <input id="wall-thickness" v-model="wall.thickness" />
          </div>
        </div>

        <div class="sidebar-block">
          <div class="heading">
            Windows
            <a class="heading-add" @click="$refs.windowModal.openModal()">Add</a>
          </div>

          <div class="list" v-if="wall.windows.length">
            <div v-for="(window, index) in wall.windows" :key="index" class="list-item">
              <span>{{ window.toString() }}</span>
            </div>
          </div>
          <template v-else>
            <small>No windows added</small>
          </template>
        </div>

        <div class="sidebar-block">
          <div class="heading">
            Doors
            <a class="heading-add" @click="$refs.doorModal.openModal()">Add</a>
          </div>

          <div class="list" v-if="wall.doors.length">
            <div v-for="(door, index) in wall.doors" :key="index" class="list-item">
              <span>{{ door.toString() }}</span>
            </div>
          </div>
          <template v-else>
            <small>No doors added</small>
          </template>
        </div>
        <div class="sidebar-block">
          <div class="heading">Estimated total</div>

          <div class="list">
            <div class="list-item">
              <span>Total materials</span>
              <strong>{{wall.getArea()}} m&sup3;</strong>
            </div>
            <div class="list-item">
              <span>Total cost</span>
              <strong>{{totalCost}}&euro;</strong>
            </div>
          </div>
        </div>
      </div>

      <ShapeRenderer class="renderer" ref="renderer" :shape="wall" />
    </div>

    <Footer class="app-footer" />

    <modal ref="windowModal" class="modal">
      <div class="modal-content">
        <form @submit.prevent="handleSubmitWindowModal">
          <div class="form-field">
            <label>Window width</label>
            <input v-model="windowModal.width" />
          </div>
          <div class="form-field">
            <label>Window height</label>
            <input v-model="windowModal.height" />
          </div>
          <div class="form-field">
            <label>Window horizontal position</label>
            <input v-model="windowModal.dstFromLeft" />
          </div>
          <div class="form-field">
            <label>Window vertical position</label>
            <input v-model="windowModal.dstFromFloor" />
          </div>
          <div class="form-field">
            <button type="submit">Create window</button>
            <a type="button" @click="$refs.windowModal.closeModal()">Cancel</a>
          </div>
        </form>
      </div>
    </modal>
    <modal ref="doorModal" class="modal">
      <div class="modal-content">
        <form @submit.prevent="handleSubmitDoorModal">
          <div class="form-field">
            <label>Door height</label>
            <input v-model="doorModal.height" />
          </div>
          <div class="form-field">
            <label>Door width</label>
            <input v-model="doorModal.width" />
          </div>
          <div class="form-field">
            <label>Door distance from left</label>
            <input placeholder="Door distance from left" v-model="doorModal.dstFromLeft" />
          </div>
          <div class="form-field">
            <button type="submit">Create door</button>
            <a type="button" @click="$refs.doorModal.closeModal()">Cancel</a>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import ShapeRenderer from "@/components/ShapeRenderer/ShapeRenderer.vue";
import { Wall } from "@/components/ShapeRenderer/shapes";

export default {
  name: "home",
  components: {
    Navbar,
    Footer,
    Modal,
    ShapeRenderer
  },
  data() {
    let wall = new Wall();

    if (localStorage.getItem("h:wall")) {
      const json = JSON.parse(localStorage.getItem("h:wall"));

      wall.width = json.width;
      wall.height = json.height;
      wall.thickness = json.thickness;

      json.windows.forEach(window => {
        wall.addWindow(
          window.width,
          window.height,
          window.dstFromLeft,
          window.dstFromFloor
        );
      });

      json.doors.forEach(door => {
        wall.addDoor(door.width, door.height, door.dstFromLeft);
      });
    }

    return {
      wall,
      doorModal: {
        width: 1,
        height: 1,
        dstFromLeft: 1
      },
      windowModal: {
        width: 1,
        height: 1,
        dstFromLeft: 1,
        dstFromFloor: 1
      }
    };
  },
  watch: {
    wall: {
      deep: 1,
      handler(wall) {
        setTimeout(() => {
          const json = JSON.stringify(
            {
              width: wall.width,
              height: wall.height,
              thickness: wall.thickness,

              windows: wall.windows.map(window => ({
                width: window.width,
                height: window.height,
                dstFromLeft: window.dstFromLeft,
                dstFromFloor: window.dstFromFloor
              })),
              doors: wall.doors.map(door => ({
                width: door.width,
                height: door.height,
                dstFromLeft: door.dstFromLeft
              }))
            },
            null,
            4
          );

          localStorage.setItem("h:wall", json);
        }, 0);
      }
    }
  },
  methods: {
    handleSubmitWindowModal() {
      const { width, height, dstFromLeft, dstFromFloor } = this.windowModal;
      this.wall.addWindow(width, height, dstFromLeft, dstFromFloor);

      this.windowModal = {
        width: 1,
        height: 1,
        dstFromLeft: 1,
        dstFromFloor: 1
      };
      this.$refs.windowModal.closeModal();
    },
    handleSubmitDoorModal() {
      const { width, height, dstFromLeft } = this.doorModal;
      this.wall.addDoor(width, height, dstFromLeft, 0);

      this.doorModal = {
        width: 1,
        height: 1,
        dstFromLeft: 1
      };
      this.$refs.doorModal.closeModal();
    }
  },
  mounted() {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
  },
  computed: {
    totalCost() {
      const costPerSquare = 3.7;
      return this.wall.getArea() * costPerSquare;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;

  .app-navbar {
    flex-grow: 0;
  }
  .app-content {
    flex-grow: 1;
    display: flex;

    .renderer {
      flex-grow: 1;
      display: flex;
    }

    .sidebar {
      padding: 12px 32px;
      min-width: 350px;
      width: auto;
      background-color: rgba(0, 255, 255, 0.15);
      text-align: left;

      .sidebar-block {
        display: flex;
        flex-direction: column;
        padding-bottom: 24px;

        .heading {
          font-size: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;

          .heading-add {
            font-size: 16px;
            cursor: pointer;
            color: #136f63;
          }
        }

        .input-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;

          label {
            flex-grow: 1;
            flex-basis: 0;
          }
          input {
            padding: 8px;
            width: 100px;
          }
        }

        .list {
          .list-item {
            display: flex;
            padding-bottom: 10px;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }

  .modal {
    .modal-content {
      min-width: 700px;
      flex: 1;
      background-color: white;
      box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.75);
      padding: 32px;

      form {
        display: flex;
        flex-direction: column;

        .form-field {
          padding: 16px 0;
          display: flex;
          justify-content: center;
          align-items: center;

          label,
          input,
          button,
          a {
            flex-basis: 0;
            flex-grow: 1;
          }

          input {
            padding: 8px 16px;
            flex-grow: 0.5;
          }

          button {
            padding: 16px;
            font-size: 16px;
            background-color: #1d9189;
            border: none;
            color: white;
            cursor: pointer;
          }

          a {
            cursor: pointer;
            font-weight: 500;
            color: #a23e48;
          }
        }
      }
    }
  }

  .app-footer {
    flex-grow: 0;
  }
}
</style>