class Document < ApplicationRecord
  has_many :users, through: :permissions
  has_many :permissions
end
