class DocumentsController < ApplicationController
  def index
    @documents = Document.all
    render :index
  end

  def show
    @document = Document.find(params[:id])
    flash[:notice] = 'Document created successfully'
    render :show
  end

  def new
    render :new
  end

  def create
    if @document = Document.create(document_params)
      redirect_to @document
    else
      @errors << @document.errors.messages
      render :new
    end
  end

  private

  def document_params
    params
      .permit(:title)
  end
end
