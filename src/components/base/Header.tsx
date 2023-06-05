// import { ElHeader } from 'element-plus';
import { useSlots } from 'vue';
import DefaultSlot from './default';

interface IProps {
    titleContent?: string;
    className?: string;
};

type slotName = 'icon' | 'title' | 'content' | 'extra' | 'breadcrumb' | 'default';

/**
 *  @param {IProps} prop
 *  不传则 显示 **默认** 配置内容
 *  ```
 *  推荐插槽名称
 *  slotName:   icon	        自定义图标
                title	        标题内容
                content	        内容
                extra	        扩展设置
                breadcrumb	    面包屑内容
                default	        默认内容
    tips: 仅推荐使用名称，无做任何处理
    注: 在组件中间不传递插槽，添加注释，注释会被render成默认插槽
 *  ```
 */
export default (prop: IProps) => {
    const props = {
        titleContent: prop.titleContent ?? '',
        className: prop.className ?? 'justify-between',
    };
    // console.log(props);
    const slots = useSlots();
    // const slotArr = Object.keys(slots).filter(item => item !== 'default').length
    const slotArr = Object.keys(slots).length
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
    // console.log(slots, slot, slotArr, defaultSlot);
    return (
        <>
            <header
                class={['el-header flex items-center', props.className]}
                // v-slots={slot}
            >
                {
                    Object.values(slot).map((item) => {
                        return item();
                    })
                }
            </header>
        </>
    ) as unknown;
};
