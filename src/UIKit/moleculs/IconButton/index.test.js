import React from "react";
import { mount, shallow } from "enzyme";
import IconButton from ".";
import { ReactComponent as TestIcon } from "../../atoms/Icon/assets/test.svg";

const wrap = (props = {}) => shallow(<IconButton icon={TestIcon} {...props} />);

it("mounts with different combination of props", () => {
	mount(<IconButton icon={TestIcon}>test</IconButton>);
	mount(
		<IconButton icon={TestIcon} right>
			test
		</IconButton>
	);
	mount(
		<IconButton icon={TestIcon} responsive>
			test
		</IconButton>
	);
	mount(
		<IconButton icon={TestIcon} collapsed>
			test
		</IconButton>
	);
	mount(
		<IconButton icon={TestIcon} right responsive>
			test
		</IconButton>
	);
	mount(<IconButton icon={TestIcon} />);
	mount(<IconButton icon={TestIcon} right />);
	mount(<IconButton icon={TestIcon} responsive />);
	mount(<IconButton icon={TestIcon} right responsive />);
});

it("renders children when passed in", () => {
	const wrapper = wrap({ children: "test" });
	expect(wrapper.contains("test")).toBe(true);
});

it("renders props when passed in", () => {
	const wrapper = wrap({ id: "foo" });
	expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});

it("passes height to icon", () => {
	const wrapper = wrap({ height: 20 });
	expect(wrapper.find({ height: 20 / 2.5 })).toHaveLength(1);
});
