const express = require('express');
import connect from '../controllers/db/connect';
import checkDiskSpace from '../controllers/db/checkDiskSpace';
import createTable from '../controllers/db/createTable';
import table from '../controllers/db/table';
import tableColumn from '../controllers/db/tableColumn';
import singleInsert from '../controllers/db/singleInsert';
import bulkInsert from '../controllers/db/bulkInsert';
import pipeline from '../controllers/db/pipeline';

const router = express.Router();
let sequelize=undefined;
router.post(
  '/connect',
  connect
);
router.post(
  '/checkDiskSpace',
  checkDiskSpace
);
router.post(
  '/createTable',
  createTable
);
router.post(
    '/table',
    table
  );
  router.post(
    '/tableColumn',
    tableColumn
  );
  router.post(
    '/singleInsert',
    singleInsert
  );
  router.post(
    '/bulkInsert',
    bulkInsert
  );
  router.post(
    '/pipeline',
    pipeline
  );

export default router;