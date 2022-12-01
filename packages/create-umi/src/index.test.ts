import { rimraf } from '@umijs/utils';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { prompts } from '@umijs/utils';
import runGenerator from './index';

const fixtures = join(__dirname, '..', 'fixtures');

let oldCwd = process.cwd();

beforeEach(() => {
  oldCwd = process.cwd();
});

afterEach(() => {
  process.chdir(oldCwd);
});

test('generate app', async () => {
  const cwd = join(fixtures, 'app');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
      default: true,
    },
  });
  expect(existsSync(join(cwd, 'src', 'pages', 'index.tsx'))).toEqual(true);
  rimraf.sync(cwd);
});

test('generate plugin', async () => {
  const cwd = join(fixtures, 'plugin');
  await runGenerator({
    cwd,
    args: {
      plugin: true,
      _: [],
      $0: '',
      default: true,
    },
  });
  expect(existsSync(join(cwd, 'src', 'index.ts'))).toEqual(true);
  rimraf.sync(cwd);
});

test('no antd version select if not max template', async () => {
  prompts.inject(['app', 'pnpm', 'https://registry.npmjs.org/']);
  const cwd = join(fixtures, 'antd');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
    },
  });

  expect(existsSync(join(cwd, 'src', 'pages', 'index.tsx'))).toEqual(true);
  rimraf.sync(cwd);
});

test('generate AntDesign Pro with V4', async () => {
  const antdVersion = '^4.20.7';
  prompts.inject(['max', antdVersion, 'pnpm', 'https://registry.npmjs.org/']);
  const cwd = join(fixtures, 'antd');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
    },
  });

  const pkgContent = JSON.parse(
    readFileSync(join(cwd, 'package.json'), 'utf-8'),
  );
  expect(pkgContent.dependencies.antd).toBe(antdVersion);
  rimraf.sync(cwd);
});

test('generate AntDesign Pro with V5', async () => {
  const antdVersion = '^5.0.0';
  prompts.inject(['max', antdVersion, 'pnpm', 'https://registry.npmjs.org/']);
  const cwd = join(fixtures, 'antd');
  await runGenerator({
    cwd,
    args: {
      _: [],
      $0: '',
    },
  });

  const pkgContent = JSON.parse(
    readFileSync(join(cwd, 'package.json'), 'utf-8'),
  );
  expect(pkgContent.dependencies.antd).toBe(antdVersion);
  rimraf.sync(cwd);
});
