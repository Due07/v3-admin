import { ElPageHeader } from 'element-plus';
import { useSlots } from 'vue';
import DefaultSlot from './default';

interface IProps {
    titleContent?: string;
};

type slotName = 'icon' | 'title' | 'content' | 'extra' | 'breadcrumb' | 'default';

/**
 *  不传则 显示 **默认** 配置内容
 *  可供选择插槽
 *  ```
 *  // https://element-plus.gitee.io/zh-CN/component/page-header.html#page-header-%E6%8F%92%E6%A7%BD
 *  slotName:   icon	        自定义图标
                title	        标题内容
                content	        内容
                extra	        扩展设置
                breadcrumb	    面包屑内容
                default	        默认内容
 *  ```
 */
export default (prop: IProps) => {
    const props = {
        titleContent: prop.titleContent ?? '',
    };
    console.log(props);
    const slots = useSlots();
    const slotArr = Object.keys(slots).filter(item => item !== 'default').length
        ? Object.keys(slots)
        : [];
    const defaultSlot = DefaultSlot;
    let slot: Partial<Record<slotName, any>> = {};

    if (slotArr.length) {
        slot = slotArr.reduce((pre, cur) => {
            const curObj = {
                [cur]: (slots as Object)[cur],
            };
            return pre ? {...pre, ...curObj} : curObj;
        }, {}) as typeof slot;

    } else {
        slot = defaultSlot;
    }
    console.log(slots, slot, slotArr, defaultSlot);
    return (
        <>
            <ElPageHeader
                icon=""
                title=""
                content={props.titleContent}
                v-slots={slot}
            >
            </ElPageHeader>
        </>
    ) as unknown;
};
