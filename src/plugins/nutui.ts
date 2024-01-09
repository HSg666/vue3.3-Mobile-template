/**
 * @description  按需引入Nutui
 */
import { Sku, Popup, InputNumber, Icon, Cell, Button, Toast, Tabbar, TabbarItem, Sticky, Navbar } from '@nutui/nutui'
const pluginsNutui = [Sku, Popup, InputNumber, Icon, Cell, Button, Toast, Tabbar, TabbarItem, Sticky, Navbar]
export const nutuiPlugins = {
	install: function (vm) {
		pluginsNutui.forEach((item: any) => {
			vm.component(item.name, item)
		})
	},
}
