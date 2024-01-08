/**
 * @description  按需引入Nutui
 */
import { Sku, Popup, InputNumber, Price, Icon, OverLay, Cell, Button, Address, Elevator, Toast } from '@nutui/nutui'
const pluginsNutui = [Sku, Popup, InputNumber, Price, Icon, OverLay, Cell, Button, Address, Elevator, Toast]
export const nutuiPlugins = {
	install: function (vm) {
		pluginsNutui.forEach((item: any) => {
			vm.component(item.name, item)
		})
	},
}
