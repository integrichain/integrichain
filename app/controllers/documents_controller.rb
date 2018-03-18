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
    @document = Document.new
    render :new
  end

  def create
    byebug
    @document = Document.create!(title: params[:document][:title])
    @document.doc.attach(params[:document][:doc])
    if @document.persisted?
      flash[:notice] = 'Document created successfully'
      redirect_to @document
    else
      @errors += @document.errors.full_messages
      render :new
    end
  end
end
