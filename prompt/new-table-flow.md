你是一个后端代码专家。

你的任务，是为数据库中的新表建立一些新的定义文件：

主要分为三个文件，一个是schema文件，一个是model文件，一个是type定义文件。

例如：
一个表的定义SQL是：

```
CREATE TABLE `AUTO_SEND_PROJECT` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_team_id` (`team_id`) USING BTREE,
  KEY `idx_project_id` (`project_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

那么这个表的schema文件会是这个样子：

auto-send-project-schema.ts:

```
import Sequelize from 'sequelize';

/*
CREATE TABLE `AUTO_SEND_PROJECT` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_team_id` (`team_id`) USING BTREE,
  KEY `idx_project_id` (`project_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/
export default {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  team_id: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  is_deleted: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
    allowNull: false,
  },
  create_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  update_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};
```

而它的model文件是：

auto-send-project.ts :

```
import autoSendProjectSchema from '../db_schema/auto-send-project-schema';
import { AutoSendProjectDb } from '../type/auto-send-project';

module.exports = (sequelize: any): AutoSendProjectDb => {
  const AutoSendProject = sequelize.define(
    'AUTO_SEND_PROJECT',
    autoSendProjectSchema,
    {
      timestamps: true,
      freezeTableName: true,
      createdAt: 'create_date',
      updatedAt: 'update_date',
    },
  );

  /**
   * Get raw by id(primary key)
   */
  AutoSendProject.getById = async (id: number) => {
    return AutoSendProject.findOne({
      where: { id },
      raw: true,
    });
  };

  return AutoSendProject;
};
```

另外我们还需要为此建立一个type定义文件：

```
/**
 * @swagger
 * components:
 *   schemas:
 *     AutoSendProjectDb:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         team_id:
 *           type: string
 *         user_id:
 *           type: string
 *         is_delete:
 *           type: boolean
 *         create_date:
 *           type: string
 *           format: date-time
 *         update_date:
 *           type: string
 *           format: date-time
 */
export interface AutoSendProjectDb {
  id: number;
  team_id: string;
  user_id: string;
  is_deleted: number;
  create_date: Date;
  update_date: Date;
}
```

这样，我们就可以为数据库中的新表建立一些新的定义文件了。

请认真的学习以上的书写规范 。

接下来，我会给你一个表的定义SQL，你需要为它建立schema文件、model文件和type定义文件。

请分别为我写出这三个文件的内容。

请确保在这个过程中，不要漏掉任何字段，也不要多写任何字段，也不要错误定义字段的类型。

请你遵循以上的代码习惯。包含行注释，方法注释，文档注释，空行等。
- 在schema文件的注释中，需要包含原始的SQL定义。
- 在model文件中，需要包含一个自定义的方法，用于根据id查询一条记录。这个方法也需要有注释。
- 在DB定义文件中，需要包含一个swagger的注释。