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
import { useGlobalStore } from '@/store/state/GLOBAL';

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
    const globalStore = useGlobalStore();
    const onCommand = (command: typeof globalStore['SIZE']) => {
      globalStore.setSize(command);
    };
    const itemArr: typeof globalStore['SIZE'][] = ['large', 'default', 'small'];

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
                  <ElDropdownItem command={item} disabled={globalStore.SIZE === item}>
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

    const colorChange = (value: string | null) => value && globalStore.setColor(value);

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
          size={globalStore.SIZE}
          modelValue={globalStore.COLOR}
          onChange={colorChange}
          show-alpha
        />
      </div>
    );
  },
};
