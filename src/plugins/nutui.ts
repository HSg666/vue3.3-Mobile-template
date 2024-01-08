/**
 * @description  按需引入Nutui
 */
import { Sku, Popup, InputNumber, Price, Icon, OverLay, Cell, Button, Address, Elevator, Toast, Tabbar, TabbarItem } from '@nutui/nutui'
const pluginsNutui = [Sku, Popup, InputNumber, Price, Icon, OverLay, Cell, Button, Address, Elevator, Toast, Tabbar, TabbarItem]
export const nutuiPlugins = {
	install: function (vm) {
		pluginsNutui.forEach((item: any) => {
			vm.component(item.name, item)
		})
	},
}
