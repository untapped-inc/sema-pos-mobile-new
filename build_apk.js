/* eslint-disable import/no-extraneous-dependencies */

const Listr = require('listr');
let axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const meow = require('meow');

const cli = meow(
  `
    Usage
      $ yarn buildapk --kiosk=corail
`,
  {
    flags: {
      kiosk: {
        type: 'string',
        alias: 'k',
        default: 'corail'
      }
    }
  }
);

const selectedKioskName = cli.flags.kiosk;

const axiosOptions = {
  // Using the v1 endpoints
  baseURL: 'http://localhost:3001/api/v1'
};

axios = axios.create(axiosOptions);

const tasks = new Listr([
  {
    title: 'Create "data" directory into the "assets" one',
    skip: () => fs.existsSync('./assets/data'),
    task: () => {
      fs.mkdirSync('./assets/data');
    }
  },
  {
    title: 'Fetch and save list of kiosks',
    task: async (ctx) => {
      const { data } = await axios.get('/kiosks');

      ctx.kiosk = data.reduce((curr, next) => {
        if (curr.name.toLowerCase() === selectedKioskName.toLowerCase()) return curr;
        return next;
      });

      fs.writeFileSync(
        './assets/data/kiosks.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save settings',
    task: async () => {
      const { data } = await axios.get('/settings');

      fs.writeFileSync(
        './assets/data/settings.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save parameters',
    task: async () => {
      const { data } = await axios.get('/parameters');

      fs.writeFileSync(
        './assets/data/parameters.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save sampling sites',
    task: async () => {
      const { data } = await axios.get('/sampling_sites');

      fs.writeFileSync(
        './assets/data/sampling_sites.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save kiosk parameters',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(
        `/kiosk_parameters/?kiosk_id=${ctx.kiosk.id}`
      );

      fs.writeFileSync(
        './assets/data/kiosk_parameters.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save readings',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(`/readings/?kiosk_id=${ctx.kiosk.id}`);

      fs.writeFileSync(
        './assets/data/readings.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save product categories',
    task: async () => {
      const { data } = await axios.get('/product_categories');

      fs.writeFileSync(
        './assets/data/product_categories.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save product mrps',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(
        `/product_mrps/?kiosk_id=${ctx.kiosk.id}`
      );

      fs.writeFileSync(
        './assets/data/product_mrps.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save products',
    task: async () => {
      const { data } = await axios.get('/products/?no_image=1');

      fs.writeFileSync(
        './assets/data/products.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save a month worth of receipts and their line items',
    task: () => new Listr([
      {
        title: 'Get list of receipts',
        task: async (ctx, task) => {
          task.title = `${task.title} for ${ctx.kiosk.name}`;

          const beginDate = moment().format('YYYY-MM-DD');
          const endDate = moment()
            .subtract(3, 'months')
            .format('YYYY-MM-DD');

          const { data } = await axios.get(
            `/receipts/?kiosk_id=${
              ctx.kiosk.id
            }&begin_date=${beginDate}&end_date=${endDate}`
          );

          ctx.endDate = endDate;
          ctx.beginDate = beginDate;

          return fs.writeFileSync(
            './assets/data/receipts.json',
            JSON.stringify(data, null, 2),
            'utf-8'
          );
        }
      },
      {
        title: 'Get list of receipt line items',
        task: async (ctx, task) => {
          task.title = `${task.title} for ${ctx.kiosk.name}`;

          const { data } = await axios.get(
            `/receipt_line_items/?begin_date=${ctx.beginDate}&end_date=${
              ctx.endDate
            }`
          );

          return fs.writeFileSync(
            './assets/data/receipt_line_items.json',
            JSON.stringify(data, null, 2),
            'utf-8'
          );
        }
      }
    ])
  },
  {
    title: 'Fetch and save settings',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(
        `/kiosk_settings/?kiosk_id=${ctx.kiosk.id}`
      );

      fs.writeFileSync(
        './assets/data/kiosk_settings.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save customer accounts',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(
        `/customer_accounts/?kiosk_id=${ctx.kiosk.id}`
      );

      fs.writeFileSync(
        './assets/data/customer_accounts.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save customer types',
    task: async () => {
      const { data } = await axios.get('/customer_types');

      fs.writeFileSync(
        './assets/data/customer_types.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save sales channels',
    task: async () => {
      const { data } = await axios.get('/sales_channels');

      fs.writeFileSync(
        './assets/data/sales_channels.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save users',
    task: async (ctx, task) => {
      task.title = `${task.title} for ${ctx.kiosk.name}`;

      const { data } = await axios.get(`/users/?kiosk_id=${ctx.kiosk.id}`);

      fs.writeFileSync(
        './assets/data/users.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save user roles',
    task: async (ctx, task) => {
      task.title = `${task.title}`;

      const { data } = await axios.get('/user_roles');

      fs.writeFileSync(
        './assets/data/users_roles.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  },
  {
    title: 'Fetch and save roles',
    task: async (ctx, task) => {
      task.title = `${task.title}`;

      const { data } = await axios.get('/roles');

      fs.writeFileSync(
        './assets/data/roles.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
    }
  }
]);

tasks.run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
