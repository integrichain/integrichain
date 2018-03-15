class AddAbilityToPermissions < ActiveRecord::Migration[5.1]
  def change
    add_column :permissions, :ability, :string
  end
end
