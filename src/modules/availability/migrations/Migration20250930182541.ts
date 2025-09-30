import { Migration } from '@mikro-orm/migrations';

export class Migration20250930182541 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "availability" ("id" text not null, "my_flag" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "availability_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_availability_deleted_at" ON "availability" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "availability" cascade;`);
  }

}
