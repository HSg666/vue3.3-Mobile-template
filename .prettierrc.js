module.exports = {
  singleQuote: true, // 使用单引号代替双引号
  printWidth: 200, // 超过最大值换行
  semi: false, // 结尾不用分号
  useTabs: true, // 缩进使用tab, 不使用空格
  tabWidth: 4, // tab 样式宽度
  bracketSpacing: true, // 对象数组, 文字间加空格 {a: 1} => { a: 1 }
  arrowParens: "avoid", // 如果可以, 自动去除括号 (x) => x 变为 x => x
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "ignore",
  trailingComma: "all",
  overrides: [
		{
			files: '*.scss',
			options: {
				parser: 'scss',
			},
		},
	],
};
