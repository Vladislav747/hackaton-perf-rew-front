module.exports = function(plop) {
  plop.setGenerator("module", {
    description: "create module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/actions.ts",
        templateFile: "plopTemplates/module/actions.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/module.ts",
        templateFile: "plopTemplates/module/module.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/index.ts",
        templateFile: "plopTemplates/module/index.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/schema.ts",
        templateFile: "plopTemplates/module/schema.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/reducer.ts",
        templateFile: "plopTemplates/module/reducer.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/saga.ts",
        templateFile: "plopTemplates/module/saga.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/selectors.ts",
        templateFile: "plopTemplates/module/selectors.hbs",
      },
    ],
  });
  plop.setGenerator("component", {
    description: "create Component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name?",
      },
      {
        type: "confirm",
        name: "makeContainer",
        message: "Create redux container?",
      },
    ],
    actions: data => {
      let actions = [
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.tsx",
          templateFile: "plopTemplates/component/view/name.hbs",
        },
        {
          type: "add",
          path: "src/componentsUI/views/{{properCase name}}/index.ts",
          templateFile: "plopTemplates/component/view/index.hbs",
        },
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.test.ts",
          templateFile: "plopTemplates/component/view/test.hbs",
        },
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.stories.ts",
          templateFile: "plopTemplates/component/view/stories.hbs",
        },
      ];
      if (data && data.makeContainer) {
        actions.push({
          type: "add",
          path:
            "src/componentsUI/containers/{{properCase name}}/{{properCase name}}.tsx",
          templateFile: "plopTemplates/component/container/name.hbs",
        });
        actions.push({
          type: "add",
          path: "src/componentsUI/containers/{{properCase name}}/index.ts",
          templateFile: "plopTemplates/component/container/index.hbs",
        });
      }
      return actions;
    },
  });
  /* */
  plop.setGenerator("component-type2", {
    description: "create Component type2",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name?",
      },
    ],
    actions: data => {
      let actions = [
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.tsx",
          templateFile: "plopTemplates/component/view/name.hbs",
        },
        {
          type: "add",
          path: "src/componentsUI/views/{{properCase name}}/index.ts",
          templateFile: "plopTemplates/component/view/index.hbs",
        },
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.test.ts",
          templateFile: "plopTemplates/component/view/test.hbs",
        },
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/{{properCase name}}.stories.ts",
          templateFile: "plopTemplates/component/view/stories.hbs",
        },
        {
          type: "add",
          path:
            "src/componentsUI/views/{{properCase name}}/styled-components/index.ts",
          templateFile:
            "plopTemplates/component/view/styled-components/index.hbs",
        },
      ];
      return actions;
    },
  });
};
