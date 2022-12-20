import { IApi } from 'umi';

export default (api: IApi) => {
  api.modifyConfig((memo) => {
    console.log(api.args);
    memo.define = {
      Foo: api.args.foo ? 'foo' : '',
    };
    return memo;
  });
};
