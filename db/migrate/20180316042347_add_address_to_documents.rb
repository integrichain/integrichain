class AddAddressToDocuments < ActiveRecord::Migration[5.1]
  def change
    add_column :documents, :address, :string
  end
end
