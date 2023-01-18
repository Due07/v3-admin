<!-- 语法1 -->
```
<template>
    <div>
        {{ title }}
        {{ featureRef }}
        {{ featureState }}
    </div>
</template>
<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
export default {
    props: [
        title: {
            type: Number,
            default: 0,
        },
    ],
    setup(props, context) {
        const featureRef = ref(1);
        console.log(props, context);
        const featureState = reactive({ property: 'value' });

        onMounted(() => {
            console.log(111);
        });
        // 可使用 装饰器 const form = new Form()     <- Form 中使用装饰器
        return {
            // form
            featureRef,
            featureState,
        };
    },

    data() {
        return {
            hha: 1,
        };
    },
    mounted() {
        console.log(this.hha);
    },
};
</script>
```typescript

<!-- 语法2 -->
```
<template>
    <div>
        {{ featureRef }}
        {{ featureState }}
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const featureRef = ref(1);
const featureState = reactive({ property: 'value' });
</script>
```typescript

