/**
 *  拖拽函数
 *  ------------------
 *  ele 需加上native 获取原生事件
 *  draggable="true"
 *  @dragstart.native="onDragstart($event, tag)"
 *  @drop.native.prevent="onDrop($event, tag)"
 *  @dragover.native.prevent
 */
import { TClass } from '../types';

type TDragEvent = DragEventInit & {target: HTMLElement};

/**
 * @param target 当前类
 * @return void
 */
export const onDragstart: TClass = (target) => {
    /**
     * @param event $event
     * @param tag Object / Array / string / number / boolean 当前拖拽的数据
     */
    target.prototype.onDragstart = function <T> (
        event: TDragEvent,
        tag: T,
    ) {
        // event.target.style.opacity = '.3';
        let handleTag!: string;
        switch (typeof tag) {
            case 'object':
                handleTag = JSON.stringify(tag);
                break;
            default:
                handleTag = `${tag}`;
                break;
        }
        if (event.dataTransfer) {
            event.dataTransfer.setData(
                'text/plain',
                handleTag,
            );
        }
    };
};

/**
 * 当前域需要有 i: Record<'value', string>
 * @param val string 拖拽变化的数组
 * @param funName string 函数名称
 * @return Function
 */
export const onDrop: (val: string, funName?: string) => TClass = (
    val,
    funName = 'onDrop',
) => (target) => {
    /**
     * @param event $event
     * @param tag 置换的数据 传递什么类型, 将转出什么类型
     */
    target.prototype[funName] = function <T> (
        event: TDragEvent,
        tag: T,
    ) {
        // TODO: 支持 obj下属性 例: form.a 考虑动态配置
        // const searchValue = val.includes('.') ? Function('that', `return that.${val}`)(this) : this[val];

        const comboJson = [...this[val][this.i.value]];

        const originObj = event.dataTransfer?.getData('text/plain');
        const nowObj = typeof tag !== 'string' ? JSON.stringify(tag) : tag;

        const originIndex = comboJson.findIndex((item) => JSON.stringify(item) === originObj);
        const nowIndex = comboJson.findIndex((item) => JSON.stringify(item) === nowObj);

        // 传递进来的数据不是string,
        if (typeof tag !== 'string') {
            [comboJson[originIndex], comboJson[nowIndex]] = [
                JSON.parse(nowObj),
                JSON.parse(originObj as string),
            ];
        } else {
            [comboJson[originIndex], comboJson[nowIndex]] = [
                nowObj,
                originObj,
            ];
        }

        console.log(comboJson);
        this[val][this.i.value] = comboJson;
    };
};
