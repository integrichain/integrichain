class CreatePermissions < ActiveRecord::Migration[5.1]
  def change
    create_table :permissions do |t|
      t.string :document_id
      t.string :user_id

      t.timestamps
    end
  end
end
