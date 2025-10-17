# Copilot Instructions for drd2-online-diary

## Language Requirement - CRITICAL

**IMPORTANT**: This project is developed in **Czech language**. All user-facing content MUST be in Czech, including:
- User interface text and labels
- Error messages and notifications
- Documentation intended for end users
- Comments explaining business logic
- Commit messages

Code elements (variable names, function names, class names) should follow English naming conventions for consistency with programming standards.

## Project Context

This is an online diary application (drd2-online-diary) designed to provide users with a secure and intuitive platform for recording their daily thoughts, experiences, and reflections.

### Core Features
- User-friendly interface for creating and managing diary entries
- Data security and privacy for user content
- Search and retrieval of past entries
- Rich text formatting and media attachments
- Tagging and categorization
- Mood tracking and analytics

## Technology Stack

### Core Technologies
- **.NET 9** - Latest .NET framework
- **Blazor** - UI framework with .NET 9 capabilities (SSR and interactive modes)
- **Radzen Blazor Components** - UI component library
- **C# 13** - Programming language

### Data & Storage
- **SQL Server** - Application database
- **Entity Framework Core 9** - ORM for data access
- **Azure Blob Storage** - File and media storage (mounted as volume to container)

### Authentication & Security
- **ASP.NET Core Identity** - Local identity management
- **Azure Key Vault** - Secrets management
- **Data Protection API** - Encryption

### Testing
- **xUnit** - Unit testing framework
- **bUnit** - Blazor component testing
- **Moq** - Mocking framework
- **FluentAssertions** - Test assertions (recommended)

### Deployment & CI/CD
- **Docker** - Containerization
- **Azure Container Apps** - Hosting platform
- **GitHub Actions** - CI/CD pipeline
- **Azure Container Registry** - Container image storage

## Solution Structure

The solution is organized into multiple projects based on separation of concerns:

```
drd2-online-diary/
├── src/
│   ├── DRD2.OnlineDiary.UI/              # Blazor application
│   │   ├── Components/                    # Blazor components
│   │   ├── Pages/                         # Routable pages
│   │   ├── Services/                      # UI-specific services
│   │   └── wwwroot/                       # Static assets
│   ├── DRD2.OnlineDiary.Business/        # Business logic layer
│   │   ├── Services/                      # Business services
│   │   ├── Validators/                    # Input validation
│   │   └── DTOs/                          # Data transfer objects
│   ├── DRD2.OnlineDiary.Data/            # Data access layer
│   │   ├── Context/                       # EF Core DbContext
│   │   ├── Entities/                      # Database entities
│   │   ├── Repositories/                  # Repository pattern
│   │   └── Migrations/                    # EF Core migrations
│   └── DRD2.OnlineDiary.Core/            # Shared/Common
│       ├── Interfaces/                    # Shared interfaces
│       ├── Models/                        # Shared models
│       └── Constants/                     # Application constants
├── tests/
│   ├── DRD2.OnlineDiary.UI.Tests/        # UI component tests (bUnit)
│   ├── DRD2.OnlineDiary.Business.Tests/  # Business logic tests
│   └── DRD2.OnlineDiary.Data.Tests/      # Data layer tests
├── .github/
│   └── workflows/                         # GitHub Actions workflows
└── docker/
    └── Dockerfile                         # Container definition
```

## Architecture & Technology

### Core Components
1. **User Management**: User registration, authentication via ASP.NET Core Identity, and profile management
2. **Diary Entry System**: CRUD operations with Radzen rich text editor and file storage via mounted volume
3. **Search and Organization**: Full-text search via SQL Server, tag-based filtering, date navigation
4. **Data Security**: Encrypted storage, secure authentication, data backup via Azure Blob Storage volume mount

### Blazor Application Architecture
- **Render Modes**: Use appropriate render modes (Static SSR, Interactive Server, Interactive WebAssembly, or Auto)
- **Component Structure**: Follow Blazor component best practices
- **State Management**: Use appropriate state management patterns
- **Dependency Injection**: Utilize built-in DI container

### File Storage Architecture
- **Azure Blob Storage** is mounted as a volume to the container at `/mnt/blob-storage`
- The application accesses files through standard file system operations (File I/O)
- **DO NOT** use Azure SDK or BlobServiceClient in the application
- All file operations should use `System.IO` classes (File, Directory, FileStream, etc.)
- The volume mount provides seamless integration between container and blob storage

## Coding Standards

### .NET 9 & Blazor Best Practices

#### Blazor Components
```csharp
// Use proper component lifecycle
@implements IAsyncDisposable

@code {
    [Parameter]
    public string Title { get; set; } = string.Empty;
    
    [Inject]
    private IEntryService EntryService { get; set; } = default!;
    
    protected override async Task OnInitializedAsync()
    {
        // Initialization logic
    }
    
    public async ValueTask DisposeAsync()
    {
        // Cleanup logic
    }
}
```

#### Entity Framework Core Patterns
```csharp
// Use async/await consistently
public async Task<DiaryEntry> GetEntryByIdAsync(int id, CancellationToken cancellationToken = default)
{
    return await _context.DiaryEntries
        .Include(e => e.Tags)
        .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
}

// Use proper migration naming (in Czech)
dotnet ef migrations add PridaniTabulkyZaznamuDeniku
```

#### Dependency Injection Registration
```csharp
// Program.cs
builder.Services.AddDbContext<DiaryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IEntryRepository, EntryRepository>();
builder.Services.AddScoped<IEntryService, EntryService>();
builder.Services.AddScoped<IFileStorageService, FileStorageService>();
```

#### Radzen Components Usage
```razor
@* Use Radzen components for UI *@
<RadzenTextBox @bind-Value="entry.Title" Placeholder="Název záznamu" />
<RadzenHtmlEditor @bind-Value="entry.Content" />
<RadzenDataGrid Data="@entries" TItem="DiaryEntry">
    <Columns>
        <RadzenDataGridColumn TItem="DiaryEntry" Property="Title" Title="Název" />
    </Columns>
</RadzenDataGrid>
```

### Code Quality
- Write modular, reusable code following SOLID principles
- Keep functions focused and small (Single Responsibility)
- Use meaningful variable and function names (English)
- Add comments for complex logic (in Czech for business logic)
- Follow C# coding conventions and .NET best practices
- Leverage C# 13 features (primary constructors, collection expressions, etc.)
- Maintain comprehensive XML documentation for public APIs

### Security - CRITICAL
- **NEVER** commit secrets, API keys, passwords, or sensitive data
- **ALWAYS** validate and sanitize inputs
- Use Azure Key Vault for secrets and connection strings
- Implement proper authentication and authorization with ASP.NET Core Identity
- Follow OWASP security guidelines
- Implement proper error handling without exposing sensitive information
- Use parameterized queries (EF Core handles this)
- Validate file uploads (type, size, malicious content) before saving
- Sanitize file names to prevent path traversal attacks
- Implement CORS policies appropriately
- Use HTTPS only in production

### Testing Requirements

#### Unit Testing with xUnit
```csharp
public class EntryServiceTests
{
    private readonly Mock<IEntryRepository> _mockRepository;
    private readonly EntryService _service;
    
    public EntryServiceTests()
    {
        _mockRepository = new Mock<IEntryRepository>();
        _service = new EntryService(_mockRepository.Object);
    }
    
    [Fact]
    public async Task GetEntryById_ReturnsEntry_WhenExists()
    {
        // Arrange
        var expectedEntry = new DiaryEntry { Id = 1, Title = "Test" };
        _mockRepository.Setup(r => r.GetByIdAsync(1, default))
            .ReturnsAsync(expectedEntry);
        
        // Act
        var result = await _service.GetEntryByIdAsync(1);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test", result.Title);
    }
}
```

#### Blazor Component Testing with bUnit
```csharp
public class DiaryEntryComponentTests : TestContext
{
    [Fact]
    public void Component_RendersTitle_Correctly()
    {
        // Arrange
        var mockService = new Mock<IEntryService>();
        Services.AddSingleton(mockService.Object);
        
        // Act
        var cut = RenderComponent<DiaryEntryComponent>(parameters => parameters
            .Add(p => p.EntryId, 1));
        
        // Assert
        cut.Find("h1").TextContent.Should().Contain("Test Entry");
    }
}
```

#### Testing Standards
- Write unit tests for all business logic
- Test Blazor components with bUnit
- Use Moq for mocking dependencies
- Ensure existing tests pass before submitting changes
- Maintain or improve test coverage (aim for 80%+)
- Include edge cases and error scenarios
- Test error handling and boundary conditions
- Use descriptive test names following pattern: MethodName_Scenario_ExpectedResult

### File Storage Implementation (Volume Mount)

**CRITICAL**: Azure Blob Storage is mounted as a volume. Use file system operations, NOT Azure SDK.

```csharp
public class FileStorageService : IFileStorageService
{
    private readonly string _storagePath;
    private readonly ILogger<FileStorageService> _logger;
    
    public FileStorageService(IConfiguration configuration, ILogger<FileStorageService> logger)
    {
        // Get mounted volume path from configuration (default: /mnt/blob-storage)
        _storagePath = configuration["FileStorage:Path"] ?? "/mnt/blob-storage";
        _logger = logger;
        
        // Ensure directory exists
        Directory.CreateDirectory(_storagePath);
    }
    
    public async Task<string> SaveFileAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default)
    {
        // Sanitize file name to prevent path traversal
        var sanitizedFileName = Path.GetFileName(fileName);
        var uniqueFileName = $"{Guid.NewGuid()}_{sanitizedFileName}";
        var filePath = Path.Combine(_storagePath, uniqueFileName);
        
        try
        {
            // Save file using standard File I/O
            using var fileOutput = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None);
            await fileStream.CopyToAsync(fileOutput, cancellationToken);
            
            _logger.LogInformation("File saved successfully: {FilePath}", filePath);
            return uniqueFileName; // Return relative path/filename
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving file: {FileName}", fileName);
            throw;
        }
    }
    
    public async Task<Stream> GetFileAsync(string fileName, CancellationToken cancellationToken = default)
    {
        var filePath = Path.Combine(_storagePath, fileName);
        
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Soubor nebyl nalezen: {fileName}");
        }
        
        return new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
    }
    
    public Task DeleteFileAsync(string fileName, CancellationToken cancellationToken = default)
    {
        var filePath = Path.Combine(_storagePath, fileName);
        
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            _logger.LogInformation("File deleted: {FilePath}", filePath);
        }
        
        return Task.CompletedTask;
    }
}
```

#### Configuration for File Storage
```json
// appsettings.json
{
  "FileStorage": {
    "Path": "/mnt/blob-storage",  // Path to mounted Azure Blob Storage volume
    "MaxFileSizeBytes": 10485760,  // 10 MB
    "AllowedExtensions": [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".txt"]
  }
}
```

## Development Workflow

### Before Starting Work
1. Read and understand the issue or feature request fully
2. Review related code and documentation
3. Ensure you have the latest .NET 9 SDK installed
4. Verify local database is running
5. For local development, create a local directory to simulate the mounted volume (e.g., `./local-storage`)
6. Plan your approach with clear steps
7. Identify potential edge cases and challenges

### During Development
1. Make small, focused, atomic commits (messages in Czech)
2. Test changes frequently (both manually and automated)
3. Run migrations locally before committing
4. Update documentation as needed
5. Follow existing patterns and architecture
6. Ensure backward compatibility when possible
7. Use `dotnet watch` for rapid development

### Before Submitting
1. Run all tests: `dotnet test`
2. Check code formatting: `dotnet format`
3. Run EF Core migration check
4. Verify no regressions are introduced
5. Review your own changes
6. Update relevant documentation
7. Write clear, descriptive commit messages (in Czech)
8. Ensure Docker build succeeds locally

## Common Tasks Guidelines

### Bug Fixes
1. Reproduce the bug locally
2. Write a failing test that demonstrates the bug
3. Identify root cause
4. Implement minimal fix
5. Verify test passes
6. Ensure no regressions

### Feature Implementation
1. Understand requirements thoroughly
2. Design solution following project architecture
3. Create/update database entities and migrations if needed
4. Implement business logic in Business layer
5. Create/update Blazor components with Radzen
6. Implement incrementally
7. Test thoroughly (unit, integration, component)
8. Document usage (in Czech where appropriate)

### Database Migrations
```bash
# Add new migration
dotnet ef migrations add NazevMigrace --project src/DRD2.OnlineDiary.Data

# Update database
dotnet ef database update --project src/DRD2.OnlineDiary.Data

# Revert migration
dotnet ef database update PredchoziMigrace --project src/DRD2.OnlineDiary.Data
```

### Code Refactoring
1. Make changes incrementally
2. Ensure all tests still pass
3. Verify no behavior changes
4. Maintain or improve code quality
5. Update tests if necessary

## Docker & Deployment

### Dockerfile with Volume Mount
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Create directory for mounted volume
RUN mkdir -p /mnt/blob-storage && chmod 777 /mnt/blob-storage

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/DRD2.OnlineDiary.UI/DRD2.OnlineDiary.UI.csproj", "src/DRD2.OnlineDiary.UI/"]
COPY ["src/DRD2.OnlineDiary.Business/DRD2.OnlineDiary.Business.csproj", "src/DRD2.OnlineDiary.Business/"]
COPY ["src/DRD2.OnlineDiary.Data/DRD2.OnlineDiary.Data.csproj", "src/DRD2.OnlineDiary.Data/"]
COPY ["src/DRD2.OnlineDiary.Core/DRD2.OnlineDiary.Core.csproj", "src/DRD2.OnlineDiary.Core/"]
RUN dotnet restore "src/DRD2.OnlineDiary.UI/DRD2.OnlineDiary.UI.csproj"
COPY . .
WORKDIR "/src/src/DRD2.OnlineDiary.UI"
RUN dotnet build "DRD2.OnlineDiary.UI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DRD2.OnlineDiary.UI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DRD2.OnlineDiary.UI.dll"]
```

### Local Docker Build with Volume Mount
```bash
# Build image
docker build -t drd2-online-diary:latest -f docker/Dockerfile .

# Run container with local volume mount (for development)
docker run -p 8080:8080 \
  -v $(pwd)/local-storage:/mnt/blob-storage \
  -e ConnectionStrings__DefaultConnection="..." \
  -e FileStorage__Path="/mnt/blob-storage" \
  drd2-online-diary:latest
```

### Azure Container Apps Configuration

In Azure Container Apps, configure the volume mount to Azure Blob Storage:

```yaml
# Container Apps YAML configuration snippet
properties:
  template:
    containers:
      - name: drd2-online-diary
        image: yourregistry.azurecr.io/drd2-online-diary:latest
        volumeMounts:
          - volumeName: blob-storage
            mountPath: /mnt/blob-storage
    volumes:
      - name: blob-storage
        storageType: AzureBlob
        storageName: diary-blob-storage  # Reference to storage definition
```

### GitHub Actions Workflow
- Automatically builds and tests on pull requests
- Deploys to Azure Container Apps on merge to main
- Runs database migrations as part of deployment
- Uses Azure Key Vault for secrets
- Configures volume mount for Azure Blob Storage

### Environment Configuration
- **Development**: Local SQL Server, local directory mounted as volume (e.g., `./local-storage`)
- **Staging**: Azure SQL Database, Azure Blob Storage mounted as volume
- **Production**: Azure SQL Database, Azure Blob Storage mounted as volume

## Code Review Checklist

Before submitting changes, verify:
- [ ] Code follows .NET and Blazor best practices
- [ ] All tests pass (unit, integration, component)
- [ ] Documentation is updated (in Czech where appropriate)
- [ ] No security vulnerabilities introduced
- [ ] Changes are minimal and focused
- [ ] Commit messages are clear and in Czech
- [ ] No unrelated changes included
- [ ] No sensitive data or credentials committed
- [ ] EF Core migrations are included if schema changed
- [ ] Radzen components are used appropriately
- [ ] Proper async/await patterns used
- [ ] Dependency injection is correctly implemented
- [ ] File operations use System.IO, NOT Azure SDK
- [ ] File uploads are validated for security (type, size, path traversal)
- [ ] Docker build succeeds

## Error Handling

- Implement comprehensive error handling with try-catch blocks
- Provide clear error messages (in Czech for users, English for logs)
- Never hide or ignore errors
- Log errors appropriately using ILogger
- Handle edge cases gracefully
- Use custom exceptions for business logic errors
- Implement global error handling in Blazor (ErrorBoundary)
- Handle file system exceptions (access denied, disk full, file not found)

### Example Error Handling
```csharp
public async Task<Result<DiaryEntry>> CreateEntryAsync(DiaryEntryDto dto)
{
    try
    {
        // Validation
        if (string.IsNullOrWhiteSpace(dto.Title))
        {
            return Result<DiaryEntry>.Failure("Název záznamu je povinný");
        }
        
        // Business logic
        var entry = _mapper.Map<DiaryEntry>(dto);
        await _repository.AddAsync(entry);
        
        _logger.LogInformation("Created diary entry with ID {EntryId}", entry.Id);
        return Result<DiaryEntry>.Success(entry);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating diary entry");
        return Result<DiaryEntry>.Failure("Nepodařilo se vytvořit záznam");
    }
}
```

## Performance Optimization

### Blazor Performance
- Use `@key` directive for list rendering
- Implement virtualization for large lists (RadzenDataGrid supports this)
- Use streaming rendering for large data sets
- Optimize component re-rendering with `ShouldRender()`
- Minimize JavaScript interop calls

### Database Performance
- Use appropriate indexes on frequently queried columns
- Implement pagination for large data sets
- Use `AsNoTracking()` for read-only queries
- Avoid N+1 queries with proper `Include()` statements
- Use compiled queries for frequently executed queries

### File Storage Performance
- Implement file size limits to prevent abuse
- Use streaming for large file uploads/downloads
- Consider implementing file compression for certain types
- Cache file metadata in database (avoid repeated file system checks)
- Implement cleanup jobs for orphaned files

## Documentation

- Update API documentation for services
- Document Blazor components with XML comments
- Keep README current
- Add user guides and tutorials (in Czech)
- Document deployment and maintenance procedures
- Maintain architecture decision records (ADRs)
- Document database schema changes
- Document volume mount configuration

## Resources

- [PROJECT.md](../PROJECT.md) - Project definition and architecture
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [.NET 9 Documentation](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-9)
- [Blazor Documentation](https://learn.microsoft.com/aspnet/core/blazor/)
- [Radzen Blazor Components](https://blazor.radzen.com/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [Azure Container Apps - Volume Mounts](https://learn.microsoft.com/azure/container-apps/storage-mounts)

## Common Patterns & Examples

### Repository Pattern
```csharp
public interface IEntryRepository
{
    Task<DiaryEntry?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<DiaryEntry>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<DiaryEntry> AddAsync(DiaryEntry entry, CancellationToken cancellationToken = default);
    Task UpdateAsync(DiaryEntry entry, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
```

### Service Layer Pattern
```csharp
public interface IEntryService
{
    Task<Result<DiaryEntryDto>> GetEntryAsync(int id);
    Task<Result<IEnumerable<DiaryEntryDto>>> GetUserEntriesAsync(string userId);
    Task<Result<DiaryEntryDto>> CreateEntryAsync(CreateEntryDto dto);
    Task<Result> UpdateEntryAsync(int id, UpdateEntryDto dto);
    Task<Result> DeleteEntryAsync(int id);
}
```

### File Storage Service Interface
```csharp
public interface IFileStorageService
{
    Task<string> SaveFileAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default);
    Task<Stream> GetFileAsync(string fileName, CancellationToken cancellationToken = default);
    Task DeleteFileAsync(string fileName, CancellationToken cancellationToken = default);
    Task<bool> FileExistsAsync(string fileName, CancellationToken cancellationToken = default);
    Task<long> GetFileSizeAsync(string fileName, CancellationToken cancellationToken = default);
}
```

### Blazor Page Component
```razor
@page "/zapisy/{EntryId:int}"
@using DRD2.OnlineDiary.Business.Services
@inject IEntryService EntryService
@inject NavigationManager Navigation

<PageTitle>Detail záznamu</PageTitle>

@if (entry == null)
{
    <RadzenProgressBarCircular ShowValue="false" Mode="ProgressBarMode.Indeterminate" />
}
else
{
    <RadzenCard>
        <RadzenText TextStyle="TextStyle.H3">@entry.Title</RadzenText>
        <RadzenText>@entry.Content</RadzenText>
    </RadzenCard>
}

@code {
    [Parameter]
    public int EntryId { get; set; }
    
    private DiaryEntryDto? entry;
    
    protected override async Task OnInitializedAsync()
    {
        var result = await EntryService.GetEntryAsync(EntryId);
        if (result.IsSuccess)
        {
            entry = result.Value;
        }
        else
        {
            // Handle error
        }
    }
}
```

### File Upload Component
```razor
<RadzenUpload @ref="upload" 
              Url="upload/single" 
              Progress="@OnProgress" 
              Complete="@OnComplete"
              Accept=".jpg,.jpeg,.png,.gif,.pdf"
              MaxFileSize="10485760">
    <RadzenText>Přetáhněte soubor sem nebo klikněte pro výběr</RadzenText>
</RadzenUpload>

@code {
    RadzenUpload? upload;
    
    void OnProgress(UploadProgressArgs args)
    {
        // Update progress
    }
    
    async Task OnComplete(UploadCompleteEventArgs args)
    {
        // File uploaded successfully
        await InvokeAsync(StateHasChanged);
    }
}
```
