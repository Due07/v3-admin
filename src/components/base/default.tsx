import {
  ElDropdown, ElDropdownMenu, ElDropdownItem,
  ElColorPicker,
  // ElIcon,
  ElAvatar, ElTag,
} from 'element-plus';
// import { HelpFilled } from '@element-plus/icons-vue';
{/* <ElIcon>
    <HelpFilled/>
</ElIcon> */}
import { useSizeStore, TSize } from '@/store/state/GLOBAL_SIZE';
import { useColorStore } from '@/store/state/GLOBAL_COLOR';

/**
 * 默认配置项
 */
export default {
  content: () => (
    <div class="flex items-center">
      <ElAvatar
        size={32}
        class={'mr-3'}
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <span class="text-large font-600 mr-3"> Title </span>
      <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
        Sub title
      </span>
      <ElTag>Default</ElTag>
    </div>
  ),
  extra: () => {
    const getUseSizeStore = useSizeStore();
    const onCommand = (command: TSize) => {
      getUseSizeStore.updateSize(command);
    };
    const itemArr: TSize[] = ['large', 'default', 'small'];

    const dropdownSlot = {
      default: () => (<>
        <div>Size</div>
      </>),
      dropdown: () => {
        const down = () => (
          <ElDropdownMenu>
            {
              itemArr.map((item) => {
                return (
                  <ElDropdownItem command={item} disabled={getUseSizeStore.name === item}>
                    {item}
                  </ElDropdownItem>
                );
              })
            }
          </ElDropdownMenu>
        );
        return down();
      },
    };

    const getUseColorStore = useColorStore();
    const colorChange = (value: string | null) => value && getUseColorStore.updateColor(value);

    return (
      <div
        class={'flex align-center'}>
        <ElDropdown
          trigger="click"
          style="padding-right: 10px;"
          v-slots={dropdownSlot}
          onCommand={onCommand}
        >
        </ElDropdown>
        <ElColorPicker
          size={getUseSizeStore.name}
          modelValue={getUseColorStore.name}
          onChange={colorChange}
          show-alpha
        />
      </div>
    );
  },
};
