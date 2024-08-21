<template>
    <div>
      <el-form-item label="营位价格">
        <div v-for="(campsite, index) in campsites" :key="index" class="campsite-item">
          <el-input
            v-model="campsite.campsite_number"
            placeholder="营位编号"
            style="width: 40%; margin-right: 10px;"
          />
          <el-input
            v-model="campsite.price"
            placeholder="价格"
            style="width: 40%;"
            type="number"
          />
          <el-button 
            type="danger" 
            icon="Delete" 
            @click="removeCampsite(index)" 
            style="margin-left: 10px;">删除
          </el-button>
        </div>
      </el-form-item>
      <el-button type="primary" icon="Plus" @click="addCampsite" >添加营位</el-button>
    </div>
  </template>
  
  <script>
  /* eslint-disable */
  import { ElButton, ElIcon } from 'element-plus';
  import { Plus, Delete } from '@element-plus/icons-vue';
  export default {
    components: {
    ElButton,
    ElIcon,
    Plus,
    Delete,
    },
    props: {
      modelValue: {
        type: Array,
        default: () => [],
    },
    },
    data() {
        return {
            campsites: [],
        };
    },
    created() {
      this.campsites = this.modelValue;
    },
    watch: {
      modelValue(newVal) {
        this.campsites = newVal;
      },
      campsites: {
      deep: true, // 深度监听数组内部的变化
      handler(newVal) {
        this.$emit('update:modelValue', newVal); // 通知父组件数据变化
      }
    }
    },
    methods: {
        addCampsite() {
          this.campsites.push({
            price: 0,
            campsite_number: '',
          });
          //this.$emit('update:modelValue', this.campsites);// 通知父组件数据变化
        },
        removeCampsite(index) {
          this.campsites.splice(index, 1);
          //this.$emit('update:modelValue', this.campsites);// 通知父组件数据变化
        },
    }
  };
  </script>
  
  <style scoped>
  .campsite-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  </style>
  