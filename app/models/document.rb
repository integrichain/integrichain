class Document < ApplicationRecord
  has_many :users, through: :permissions
end
