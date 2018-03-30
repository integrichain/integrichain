class DocumentsController < ApplicationController
  def index
    @documents = current_user.documents
    render :index
  end

  def show
    @document = Document.find(params[:id])
    render :show, flash: { notice: 'Document created successfully' }
  end

  def new
    @document = Document.new
    render :new
  end

  def create
    begin
      Document.transaction do
        begin
          @document = Document.create!(params.permit(:doc, :title, :address))
          Permission.create!(user_id: current_user.id, document_id: @document.id, ability: 'READ')
          Permission.create!(user_id: current_user.id, document_id: @document.id, ability: 'WRITE')
        rescue ActiveRecord::RecordInvalid => e # Validations failed
          @errors << e.message
          raise ActiveRecord::Rollback
        end

        begin
          @document.doc.attach(params[:doc])
        rescue ActiveRecord::RecordNotSaved => e
          @errors << 'Failed to save attachment'
          raise ActiveRecord::Rollback
        end
      end
    end

    if @errors.empty?
      redirect_to @document, flash: { notice: 'Document created successfully' }
    else
      redirect_to new_document_url, flash: {error: process_errors(@errors) }
    end
  end
end
